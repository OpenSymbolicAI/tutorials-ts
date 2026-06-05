import 'reflect-metadata';
import { PlanExecute, primitive } from '@opensymbolicai/core';

export class Notebook extends PlanExecute {
  notes: string[] = [];

  @primitive({ readOnly: true, docstring: 'Return every note saved so far.' } as any)
  listNotes(): string[] {
    return [...this.notes];
  }

  @primitive({ readOnly: false, docstring: 'Save a note and return a confirmation string.' } as any)
  saveNote(text: string): string {
    this.notes.push(text);
    return `saved: ${text}`;
  }
}
