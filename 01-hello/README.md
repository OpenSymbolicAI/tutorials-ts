# Track 1: Hello, OpenSymbolicAI

The five-minute first win: a working agent that plans and executes a small
arithmetic task. Two files: [`calculator.ts`](calculator.ts) (the agent) and
[`main.ts`](main.ts) (runs it).

## 1. Install

```bash
npm install
```

## 2. Write a three-primitive agent

A **primitive** is the core building block: a typed, documented method the
planner is allowed to call. The base class `PlanExecute` turns a task into a
plan and executes it.

```typescript
// calculator.ts
import 'reflect-metadata';
import { PlanExecute, primitive } from '@opensymbolicai/core';

export class Calculator extends PlanExecute {
  @primitive({ readOnly: true })
  add(a: number, b: number): number { return a + b; }

  @primitive({ readOnly: true })
  multiply(a: number, b: number): number { return a * b; }

  @primitive({ readOnly: true })
  subtract(a: number, b: number): number { return a - b; }
}
```

The type annotations are the LLM's contract.

## 3. Run it

```typescript
// main.ts
import { Calculator } from './calculator.js';

const agent = new Calculator({ provider: 'ollama', model: 'qwen2.5-coder:7b' }, 'Calculator', 'A simple calculator');
const result = await agent.run('what is 7 times 8 minus 3');
console.log(result.result); // 53
```

```bash
npm start
```

Ollama runs locally, so **no API key is required**. Pull the model first:
`ollama pull qwen2.5-coder:7b`.

## What just happened

The LLM didn't do the arithmetic. It wrote a **plan**, a small program like
`result = subtract(multiply(7, 8), 3)`, and your primitives ran it in plain
JavaScript.
