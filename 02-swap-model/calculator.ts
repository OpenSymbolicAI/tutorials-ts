import 'reflect-metadata';
import { PlanExecute, primitive } from '@opensymbolicai/core';

export class Calculator extends PlanExecute {
  @primitive({ readOnly: true })
  add(a: number, b: number): number {
    return a + b;
  }

  @primitive({ readOnly: true })
  multiply(a: number, b: number): number {
    return a * b;
  }

  @primitive({ readOnly: true })
  subtract(a: number, b: number): number {
    return a - b;
  }
}
