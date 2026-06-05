import { LetterCounter } from './counter.js';
import { checkOllama } from './ollama.js';

const model = 'qwen2.5-coder:7b';
if (!await checkOllama(model)) process.exit(1);

const agent = new LetterCounter({ provider: 'ollama', model, params: {} }, 'LetterCounter', 'Counts letter occurrences in words');
const result = await agent.run('how many times does the letter r appear in strawberry');
if (!result.success) { console.error(result.error); process.exit(1); }
console.log(result.result); // 3
