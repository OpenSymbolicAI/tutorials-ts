import { Calculator } from './calculator.js';
import { checkOllama } from './ollama.js';

const model = 'qwen2.5-coder:7b';

if (!await checkOllama(model)) process.exit(1);

const agent = new Calculator({ provider: 'ollama', model, params: {} }, 'Calculator', 'A simple calculator');
const result = await agent.run('what is 7 times 8 minus 3');
console.log(result.result); // 53
