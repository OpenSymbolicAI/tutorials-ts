import { ShoppingCart } from './cart.js';
import { checkOllama } from './ollama.js';

const QUERY = 'add 2 apples at 3 dollars each, 2 loaves of bread at 2 dollars each, and 3 cartons of milk at 4 dollars each, then total it up';

const model = 'qwen2.5-coder:7b';
if (!await checkOllama(model)) process.exit(1);

const agent = new ShoppingCart({ provider: 'ollama', model, params: {} }, 'ShoppingCart', 'A shopping cart that tracks items and totals');

console.log('--- intent ---');
console.log(QUERY);
console.log();

// Step 1: plan the task. This calls the model but runs nothing.
const planResult = await agent.plan(QUERY);

console.log('--- plan ---');
console.log(planResult.plan);
console.log('--- planning cost ---');
console.log('usage:', planResult.usage);
console.log('time (s):', planResult.timeSeconds.toFixed(4));
console.log();

// Review the plan here: read it, log it, gate it. Nothing has run yet.

// Step 2: the plan looks right, so run it.
const execResult = await agent.execute(planResult.plan);

console.log('--- result ---');
console.log(JSON.parse(execResult.valueJson));
