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

console.log('--- plan ---');
console.log(result.plan);
console.log();

console.log('--- trace ---');
const trace = result.trace!;
for (const step of trace.steps) {
  console.log(`step ${step.stepNumber}: ${step.statement}`);
  console.log(`  namespace before: ${JSON.stringify(step.namespaceBefore)}`);
  console.log(`  value:            ${JSON.stringify(step.resultValue)}`);
  console.log(`  namespace after:  ${JSON.stringify(step.namespaceAfter)}`);
  console.log();
}

const allSucceeded = trace.steps.every(s => s.success);
const failedSteps = trace.steps.filter(s => !s.success);
console.log('every step succeeded:', allSucceeded);
console.log('failed steps:', failedSteps.map(s => s.stepNumber));
