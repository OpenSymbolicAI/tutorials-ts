import 'reflect-metadata';
import { PlanExecute, primitive } from '@opensymbolicai/core';

export class LetterCounter extends PlanExecute {
  @primitive({ readOnly: true, docstring: 'Count how many times letter appears in word.' } as any)
  countLetter(word: string, letter: string): number {
    return [...word].filter(c => c === letter).length;
  }
}
