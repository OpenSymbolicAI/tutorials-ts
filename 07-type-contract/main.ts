import { TextKit } from './textkit.js';
import { checkOllama } from './ollama.js';

const model = 'qwen2.5-coder:7b';
if (!await checkOllama(model)) process.exit(1);

const agent = new TextKit({ provider: 'ollama', model, params: {} }, 'TextKit', 'Repeats and shouts text');
const result = await agent.run('repeat the word go 3 times, then shout the result');

console.log('--- plan ---');
console.log(result.plan);
if (!result.success) {
  console.log('--- error ---');
  console.error(result.error);
  process.exit(1);
}
console.log('--- result ---');
console.log(result.result); // GOGOGO!
