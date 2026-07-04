const fs = require('fs');
const path = require('path');
const MiniSearch = require('minisearch');

// 1. Read the markdown file
const md = fs.readFileSync('portfolio_rag.md', 'utf-8');

// 2. Split by ## headers
const chunks = md.split(/\n(?=## )/).filter(c => c.trim());

// 3. Build the BM25 index
const miniSearch = new MiniSearch({
    fields: ['text'],
    storeFields: ['text'],
    idField: 'id',
});

const documents = chunks.map((text, id) => ({ id, text }));
miniSearch.addAll(documents);

// 4. Ensure the root data directory exists
const outputDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 5. Save the index to root data folder
const outputPath = path.join(outputDir, 'bm25-index.json');
fs.writeFileSync(outputPath, JSON.stringify(miniSearch.toJSON()));

console.log(`✅ BM25 index saved to ${outputPath}`);
console.log(`📊 ${documents.length} chunks indexed.`);