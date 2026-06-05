import { Calendar } from './dates.js';
import { checkOllama } from './ollama.js';

const model = 'qwen2.5-coder:7b';
if (!await checkOllama(model)) process.exit(1);

const agent = new Calendar({ provider: 'ollama', model, params: {} }, 'Calendar', 'Returns dates: today and the next Monday');
const result = await agent.run('calculate the date of the next Monday from the current date');
if (!result.success) { console.error(result.error); process.exit(1); }
console.log(result.result); // e.g. 2026-06-08
