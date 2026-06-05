import { ShoppingCart } from './cart.js';
import { checkOllama } from './ollama.js';

// A plan written by hand. No model wrote this one.
const PLAN = `cart = newCart()
cart = addItem(cart, "pens", 5, 3)
cart = addItem(cart, "notebook", 8, 1)
total = cartTotal(cart)`;

// Plans validatePlan() should refuse, each paired with why it is dangerous.
const BAD_PLANS: Record<string, string> = {
  'calls eval':          'x = eval("1 + 1")',
  'calls require':       'x = require("os")',
  'calls fetch':         'x = fetch("http://example.com")',
  'runs a loop':         'for i in range(3):\n    x = i',
  'calls non-primitive': 'x = unknownFunction()',
};

const model = 'qwen2.5-coder:7b';
// Kept for parity with the other tracks; validatePlan/execute never calls the model.
if (!await checkOllama(model)) process.exit(1);

const agent = new ShoppingCart({ provider: 'ollama', model, params: {} }, 'ShoppingCart', 'A shopping cart that tracks items and totals');

console.log('--- plan ---');
console.log(PLAN);

// validatePlan checks the plan before execute() runs it.
agent.validatePlan(PLAN);
const result = await agent.execute(PLAN);
console.log('--- result ---');
console.log(JSON.parse(result.valueJson));
console.log();

// In TypeScript the validation is a separate step: call validatePlan() first,
// then execute(). This makes the gate explicit rather than implicit.
console.log('--- rejected plans ---');
for (const [label, bad] of Object.entries(BAD_PLANS)) {
  try {
    agent.validatePlan(bad);
    console.log(`${label}: passed validation (unexpected)`);
  } catch (e) {
    const msg = e instanceof Error ? e.message.split('\n')[0] : String(e);
    console.log(`${label}: ${msg}`);
  }
}
