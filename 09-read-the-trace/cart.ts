import 'reflect-metadata';
import { PlanExecute, primitive } from '@opensymbolicai/core';

export interface Item { price: number; quantity: number; }
export interface Cart { items: Record<string, Item>; }

export class ShoppingCart extends PlanExecute {
  @primitive({ readOnly: true, docstring: 'Make a new, empty shopping cart.' } as any)
  newCart(): Cart {
    return { items: {} };
  }

  @primitive({ readOnly: true, docstring: 'Add an item to the cart and return the updated cart. Always assign the result: cart = addItem(cart, name, price, quantity).' } as any)
  addItem(cart: Cart, name: string, price: number, quantity: number): Cart {
    return { items: { ...cart.items, [name]: { price, quantity } } };
  }

  @primitive({ readOnly: true, docstring: 'Total the cart: sum price times quantity for every item.' } as any)
  cartTotal(cart: Cart): number {
    return Object.values(cart.items).reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
