import 'reflect-metadata';
import { PlanExecute, primitive, decomposition, recordExample } from '@opensymbolicai/core';

export interface Item { price: number; quantity: number; }
export interface Cart { items: Record<string, Item>; }

export class ShoppingCart extends PlanExecute {
  @primitive({ readOnly: true, docstring: 'Make a new, empty shopping cart.' } as any)
  newCart(): Cart { return { items: {} }; }

  @primitive({ readOnly: true, docstring: 'Add an item to the cart and return the updated cart. name must be a quoted string literal (e.g. "apples"). Always assign the result: cart = addItem(cart, "name", price, quantity).' } as any)
  addItem(cart: Cart, name: string, price: number, quantity: number): Cart {
    return { items: { ...cart.items, [name]: { price, quantity } } };
  }

  @primitive({ readOnly: true, docstring: 'Total the cart: sum price times quantity for every item.' } as any)
  cartTotal(cart: Cart): number {
    return Object.values(cart.items).reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  @primitive({ readOnly: true, docstring: 'Describe the cart items and total as a sentence.' } as any)
  describe(cart: Cart, total: number): string {
    const parts = Object.entries(cart.items).map(
      ([name, item]) => `${item.quantity} ${name} at ${item.price} dollars each`
    );
    return `${parts.join(' and ')} is ${total} dollars`;
  }

  @decomposition(
    'what do 2 apples at 3 dollars each and 1 loaf of bread at 2 dollars come to?',
    recordExample((s: any) => {
      s.cart = s.newCart();
      s.cart = s.addItem(s.cart, 'apples', 3, 2);
      s.cart = s.addItem(s.cart, 'bread', 2, 1);
      s.total = s.cartTotal(s.cart);
      s.text = s.describe(s.cart, s.total);
      return s.text;
    })
  )
  _exampleSmallOrder() {}

  @decomposition(
    'how much for 4 bananas at 2 dollars each?',
    recordExample((s: any) => {
      s.cart = s.newCart();
      s.cart = s.addItem(s.cart, 'bananas', 2, 4);
      s.total = s.cartTotal(s.cart);
      s.text = s.describe(s.cart, s.total);
      return s.text;
    })
  )
  _exampleSingleItem() {}
}
