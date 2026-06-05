import { ShoppingCart } from './cart.js';
import { checkOllama } from './ollama.js';

const QUERY = 'add 2 apples at 3 dollars each, 2 loaves of bread at 2 dollars each, and 3 cartons of milk at 4 dollars each, then total it up';

const model = 'qwen2.5-coder:7b';
if (!await checkOllama(model)) process.exit(1);

const agent = new ShoppingCart({ provider: 'ollama', model, params: {} }, 'ShoppingCart', 'A shopping cart that tracks items and totals');
const result = await agent.run(QUERY);
if (!result.success) { console.error(result.error); process.exit(1); }

console.log('--- intent ---');
console.log(result.task);
console.log();

console.log('--- metrics ---');
const m = result.metrics!;
console.log('provider:', m.provider);
console.log('model:', m.model);
console.log('steps executed:', m.stepsExecuted);
console.log('plan tokens:', m.planTokens);
console.log('  input:', m.planTokens?.inputTokens);
console.log('  output:', m.planTokens?.outputTokens);
console.log('  total:', (m.planTokens?.inputTokens ?? 0) + (m.planTokens?.outputTokens ?? 0));
console.log('plan time (s):', m.planTimeSeconds?.toFixed(4));
console.log('execute time (s):', m.executeTimeSeconds?.toFixed(4));
console.log('total time (s):', ((m.planTimeSeconds ?? 0) + (m.executeTimeSeconds ?? 0)).toFixed(4));
