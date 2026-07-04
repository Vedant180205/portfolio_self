import { Groq } from 'groq-sdk';
import { NextRequest } from 'next/server';

// ── Groq client (module-level singleton) ────────────────────────────────────
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── In-memory rate limiter ───────────────────────────────────────────────────
// Tracks request timestamps per IP within a sliding window.
// Resets when the server process restarts (fine for a portfolio).
const rateLimitStore = new Map<string, number[]>();

const RATE = {
  MAX_PER_HOUR: 30,        // max requests from one IP per hour
  WINDOW_MS: 60 * 60_000, // 1 hour in ms
};

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now        = Date.now();
  const windowStart = now - RATE.WINDOW_MS;

  const prev = (rateLimitStore.get(ip) ?? []).filter(t => t > windowStart);

  if (prev.length >= RATE.MAX_PER_HOUR) {
    const retryAfterSec = Math.ceil((prev[0] + RATE.WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  prev.push(now);
  rateLimitStore.set(ip, prev);

  // Periodic cleanup: evict IPs whose entire history is expired
  if (rateLimitStore.size > 500) {
    for (const [key, ts] of rateLimitStore) {
      if (ts.every(t => t <= windowStart)) rateLimitStore.delete(key);
    }
  }

  return { allowed: true, retryAfterSec: 0 };
}

// ── Types ────────────────────────────────────────────────────────────────────
interface HistoryEntry {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBody {
  question: string;
  context?: string;
  history?: HistoryEntry[];
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Resolve client IP (works behind Vercel / Cloudflare)
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      req.headers.get('x-real-ip') ??
      'unknown';

    const { allowed, retryAfterSec } = checkRateLimit(ip);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfterSec),
          },
        }
      );
    }

    const body = (await req.json()) as ChatBody;
    const { question, context = '', history = [] } = body;

    if (!question?.trim()) {
      return new Response(JSON.stringify({ error: 'Question is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `You are an AI assistant embedded in Vedant Patil's portfolio website.
Answer questions ONLY using the provided context. Do not hallucinate or use external knowledge.

RULES:
1. Use ONLY the information in the CONTEXT section below.
2. If the context doesn't contain the answer, respond: "I don't have that information in my portfolio yet, but feel free to email Vedant at vedbhumi123@gmail.com."
3. Be warm, professional, and concise. Keep responses under 3 short paragraphs unless listing items.
4. Format lists with dashes. Use bold sparingly.

CONTEXT:
${context || 'No context available.'}`;

    // Build conversation: system + trimmed history + current question
    const conversationMessages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      // history is already trimmed to MAX_HISTORY_TURNS on the client
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: question },
    ];

    const completion = await groq.chat.completions.create({
      model:       'llama-3.1-8b-instant',
      messages:    conversationMessages,
      temperature: 0.3,
      max_tokens:  400,   // conservative — keeps Groq free-tier usage low
      stream:      true,
    });

    // Stream as SSE
    const stream = new ReadableStream({
      async start(controller) {
        const enc = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices?.[0]?.delta?.content ?? '';
            if (content) {
              controller.enqueue(
                enc.encode(`data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`)
              );
            }
          }
          controller.enqueue(enc.encode('data: [DONE]\n\n'));
        } catch (e) {
          controller.error(e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type':  'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':    'keep-alive',
      },
    });
  } catch (err) {
    console.error('[Chat API]', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
