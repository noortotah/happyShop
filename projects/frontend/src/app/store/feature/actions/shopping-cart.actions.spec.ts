import * as fromShoppingCart from './shopping-cart.actions';

describe('loadShoppingCarts', () => {
  it('should return an action', () => {
    expect(fromShoppingCart.loadShoppingCarts().type).toBe('[ShoppingCart] Load ShoppingCarts');
  });
});
