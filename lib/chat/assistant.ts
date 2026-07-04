import MiniSearch from 'minisearch';
import type { Message } from '../../components/chat/types';
import { CHAT_LIMITS } from '../../components/chat/constants';

let searchEngine: MiniSearch | null = null;
let indexLoaded = false;
let loadingPromise: Promise<void> | null = null;

export const loadSearchIndex = async (): Promise<void> => {
  if (indexLoaded) return;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      const res = await fetch('/data/bm25-index.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const textData = await res.text();
      searchEngine = MiniSearch.loadJSON(textData, {
        fields: ['text'],
        storeFields: ['text'],
        idField: 'id',
      });
      indexLoaded = true;
    } catch (err) {
      console.error('❌ Failed to load BM25 index:', err);
      loadingPromise = null; // allow retry on next call
    }
  })();

  return loadingPromise;
};

export const sendMessage = async (
  question: string,
  history: Message[],
  onToken: (token: string) => void,
  onError: (error: Error) => void,
  onComplete?: () => void
): Promise<void> => {
  try {
    await loadSearchIndex();

    // BM25 retrieval — top 3 relevant chunks
    let context = '';
    if (searchEngine) {
      const results = searchEngine.search(question, { fuzzy: 0.2 }).slice(0, 3);
      context = results.map((r) => r.text as string).join('\n\n');
    }

    // Trim history to last N turns to control token usage
    const trimmedHistory = history.slice(-(CHAT_LIMITS.MAX_HISTORY_TURNS * 2));

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context, history: trimmedHistory }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({})) as { error?: string };
      throw new Error(errData.error || `Request failed: ${res.status}`);
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error('No readable stream on response');

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data) as { choices: [{ delta: { content?: string } }] };
          const content = parsed.choices?.[0]?.delta?.content ?? '';
          if (content) onToken(content);
        } catch {
          // Non-JSON SSE line — ignore
        }
      }
    }

    onComplete?.();
  } catch (err) {
    onError(err instanceof Error ? err : new Error('Unknown error'));
  }
};
