import { Notebook } from './notebook.js';
import { checkOllama } from './ollama.js';

const model = 'qwen2.5-coder:7b';
if (!await checkOllama(model)) process.exit(1);

const agent = new Notebook({ provider: 'ollama', model, params: {} }, 'Notebook', 'A simple notebook that saves and lists notes');
const result = await agent.run('save notes that say buy milk, walk the dog, and call mom, then list every note');
if (!result.success) { console.error(result.error); process.exit(1); }
console.log(result.result); // ['buy milk', 'walk the dog', 'call mom']
