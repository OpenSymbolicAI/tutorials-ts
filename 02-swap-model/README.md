# Track 2: Swap the local model

The model is a one-line change. Here you run the exact agent from Track 1 on a
different Ollama model, changing nothing but the `model` string in the config.

## What changed from Track 1

Nothing, except one line in [`main.ts`](main.ts):

```diff
- const model = 'qwen2.5-coder:7b';
+ const model = 'gemma4:e2b';
```

## Run it

```bash
ollama pull gemma4:e2b
npm install
npm start
```

## What you'll see

```
53
```

Same agent, same task, a different and smaller model, same answer. `gemma4:e2b`
writes its own plan to get there:

```
result1 = multiply(a=7, b=8)
result2 = subtract(a=result1, b=3)
```

## Takeaway

The agent is decoupled from the model. Swapping models is a config change, not a
code change: your primitives, plan logic, and task stay put while the model
behind them changes.
