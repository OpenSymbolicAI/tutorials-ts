import { Account } from './account.js';
import { checkOllama } from './ollama.js';
import { getPrimitives } from '@opensymbolicai/core';

const READ_ONLY_PLAN = `ok = canAfford(100, 30)
big = canAfford(100, 250)`;

const MUTATING_PLAN = `balance = deposit(100, 50)
balance = withdraw(balance, 30)
ok = canAfford(balance, 200)`;

const model = 'qwen2.5-coder:7b';
// Kept for parity with other tracks; analyzePlan never calls the model.
if (!await checkOllama(model)) process.exit(1);

const agent = new Account({ provider: 'ollama', model, params: {} }, 'Account', 'A bank account with deposit, withdraw, and balance check');
const primitives = getPrimitives(agent);

function show(label: string, plan: string): void {
  console.log(`--- ${label} ---`);
  console.log(plan);
  const analysis = agent.analyzePlan(plan);
  for (const call of analysis.primitiveCalls) {
    const meta = primitives.get(call.methodName);
    const flag = meta?.readOnly ? 'read-only' : 'mutating';
    console.log(`  ${call.methodName}: ${flag}  args=${JSON.stringify(call.args)}`);
  }
  console.log('has_mutations:', analysis.hasMutations);
  const mutating = analysis.primitiveCalls
    .filter(c => !primitives.get(c.methodName)?.readOnly)
    .map(c => c.methodName);
  console.log('mutating primitives:', mutating);
  console.log();
}

show('read-only plan', READ_ONLY_PLAN);
show('plan that moves money', MUTATING_PLAN);
