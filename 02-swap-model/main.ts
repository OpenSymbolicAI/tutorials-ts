import { Calculator } from './calculator.js';
import { checkOllama } from './ollama.js';

const model = 'gemma4:e2b';

if (!await checkOllama(model)) process.exit(1);

const agent = new Calculator({ provider: 'ollama', model, params: {} }, 'Calculator', 'A simple calculator');
const result = await agent.run('what is 7 times 8 minus 3');
console.log(result.result); // 53
