const OLLAMA_URL = 'http://localhost:11434';

export async function checkOllama(model: string): Promise<boolean> {
  let tags: { models: { name: string }[] };
  try {
    const resp = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(2000) });
    tags = await resp.json() as typeof tags;
  } catch {
    console.error("Ollama isn't running. Start the Ollama app (or run `ollama serve`).");
    return false;
  }

  const installed = new Set(tags.models.map(m => m.name));
  if (!installed.has(model)) {
    console.error(`Model '${model}' isn't pulled. Run: ollama pull ${model}`);
    return false;
  }

  return true;
}
