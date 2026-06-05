import { ShoppingCart } from './cart.js';
import { checkOllama } from './ollama.js';

const QUERIES = [
  'ring up 5 oranges at 1 dollar each and 2 yogurts at 3 dollars each',
  "what's the damage on 3 notebooks at 4 dollars each and 2 pens at 1 dollar each?",
  "I'll take 10 eggs at 1 dollar each and 1 cake at 12 dollars",
];

const model = 'qwen2.5-coder:7b';
if (!await checkOllama(model)) process.exit(1);

const agent = new ShoppingCart({ provider: 'ollama', model, params: {} }, 'ShoppingCart', 'A shopping cart that totals orders and describes them');

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
