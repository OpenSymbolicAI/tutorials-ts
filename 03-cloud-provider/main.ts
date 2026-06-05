import 'dotenv/config';
import { Calculator } from './calculator.js';

const PROVIDER_ENV: Record<string, string> = {
  openai: 'OPENAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
  groq: 'GROQ_API_KEY',
  fireworks: 'FIREWORKS_API_KEY',
};

const RUN_HINT = 'Set it in .env, then run: npm start';

const provider = process.env.LLM_PROVIDER;
const model = process.env.LLM_MODEL;

if (!provider || !model) {
  console.error(`LLM_PROVIDER and LLM_MODEL aren't set. ${RUN_HINT}`);
  process.exit(1);
}

if (!(provider in PROVIDER_ENV)) {
  console.error(`Unknown LLM_PROVIDER '${provider}'. Choose one of: ${Object.keys(PROVIDER_ENV).join(', ')}`);
  process.exit(1);
}

const envVar = PROVIDER_ENV[provider];
const apiKey = process.env[envVar];

if (!apiKey) {
  console.error(`${envVar} isn't set. ${RUN_HINT}`);
  process.exit(1);
}

const agent = new Calculator({ provider: provider as 'openai' | 'anthropic' | 'groq' | 'fireworks', model, apiKey, params: {} }, 'Calculator', 'A simple calculator');
const result = await agent.run('what is 7 times 8 minus 3');

if (!result.success) {
  console.error(result.error);
  process.exit(1);
}

console.log(result.result); // 53
