import { Calculator } from './calculator.js';
import { checkOllama } from './ollama.js';

const QUERIES = [
  'what is 7 times 8 minus 3',
  'subtract 5 from 100',
  'multiply 6 by 4, add 2, then subtract 5',
  'I have 3 boxes of 12 apples and eat 5, how many are left',
];

const model = 'qwen2.5-coder:7b';
if (!await checkOllama(model)) process.exit(1);

const agent = new Calculator({ provider: 'ollama', model, params: {} }, 'Calculator', 'A simple calculator');

for (const query of QUERIES) {
  const result = await agent.run(query);
  console.log('--- intent ---');
  console.log(result.task);
  console.log('--- plan ---');
  console.log(result.plan);
  if (!result.success) {
    console.log('--- error ---');
    console.log(result.error);
  } else {
    console.log('--- result ---');
    console.log(result.result);
  }
  console.log();
}
