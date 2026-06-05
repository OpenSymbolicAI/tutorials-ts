import { Glossary } from './glossary.js';
import { checkOllama } from './ollama.js';

const QUERIES = [
  'what does KIKO mean?',
  'what does TARN mean?',
  'what does CDXIG mean?',
  'what is the acronym for Carr-Geman-Madan-Yor model?',
  'what is the acronym for overnight indexed swap?',
];

const model = 'qwen2.5-coder:7b';
if (!await checkOllama(model)) process.exit(1);

const agent = new Glossary({ provider: 'ollama', model, params: {} }, 'Glossary', 'Expands, defines, and phrases finance acronyms');

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
