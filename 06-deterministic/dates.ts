import 'reflect-metadata';
import { PlanExecute, primitive } from '@opensymbolicai/core';

export class Calendar extends PlanExecute {
  // deterministic: false — depends on the clock; not yet reflected in TS type definitions
  @primitive({ readOnly: true, docstring: "Return today's date as a YYYY-MM-DD string." } as any)
  today(): string {
    return new Date().toISOString().split('T')[0];
  }

  // deterministic: true (default) — a pure function: same date in, same date out
  @primitive({ readOnly: true, docstring: 'Return the date of the first Monday after dateStr (YYYY-MM-DD). Always assign the result.' } as any)
  nextMonday(dateStr: string): string {
    const d = new Date(dateStr);
    const day = d.getUTCDay(); // 0=Sun, 1=Mon
    const daysAhead = day === 0 ? 1 : 8 - day;
    d.setUTCDate(d.getUTCDate() + daysAhead);
    return d.toISOString().split('T')[0];
  }
}
