import 'reflect-metadata';
import { PlanExecute, primitive } from '@opensymbolicai/core';

export class Calculator extends PlanExecute {
  @primitive({ readOnly: true, docstring: 'Add two numbers and return the sum.' } as any)
  add(a: number, b: number): number { return a + b; }

  @primitive({ readOnly: true, docstring: 'Multiply two numbers and return the product.' } as any)
  multiply(a: number, b: number): number { return a * b; }

  @primitive({ readOnly: true, docstring: 'Subtract b from a and return the result.' } as any)
  subtract(a: number, b: number): number { return a - b; }
}
