import 'reflect-metadata';
import { PlanExecute, primitive } from '@opensymbolicai/core';

export class Account extends PlanExecute {
  @primitive({ readOnly: false, docstring: 'Add amount to balance and return the new balance.' } as any)
  deposit(balance: number, amount: number): number {
    return balance + amount;
  }

  @primitive({ readOnly: false, docstring: 'Subtract amount from balance and return the new balance.' } as any)
  withdraw(balance: number, amount: number): number {
    return balance - amount;
  }

  @primitive({ readOnly: true, docstring: 'Return true if balance covers price, false otherwise.' } as any)
  canAfford(balance: number, price: number): boolean {
    return balance >= price;
  }
}
