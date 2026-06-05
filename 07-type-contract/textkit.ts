import 'reflect-metadata';
import { PlanExecute, primitive } from '@opensymbolicai/core';

export class TextKit extends PlanExecute {
  @primitive({ readOnly: true, docstring: 'Repeat text the given number of times and return the result.' } as any)
  repeat(text: string, times: number): string {
    return text.repeat(times);
  }

  @primitive({ readOnly: true, docstring: 'Return text uppercased with an exclamation mark.' } as any)
  shout(text: string): string {
    return text.toUpperCase() + '!';
  }
}
