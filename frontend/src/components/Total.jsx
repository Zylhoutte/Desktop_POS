import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCart,
  deleteFromCart,
  clearCart,
  incrementItem,
  decrementItem,
} from '../features/cart/cartSlice';

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const calculateItemTotal = (item) => {
    return item.quantity * item.price;
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const calculateTax = () => {
    // You can customize the tax calculation logic based on your requirements
    // For example, you might want to apply a fixed tax rate or a percentage of the total
    const taxRate = 0.1; // 10% tax rate
    return calculateCartTotal() * taxRate;
  };


  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>

      {/* Total items in the cart */}
      <div className="font-semibold text-lg text-white">Total Items in Cart: {totalItemsInCart}</div>
      {/* Cart total and tax */}
      <div className="flex justify-between items-center">
        <div className="font-semibold text-lg text-white">Cart Total:</div>
        <div className="font-semibold text-lg text-white">
          {`₱${calculateCartTotal().toFixed(2)}`}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-lg text-white">Tax:</div>
        <div className="font-semibold text-lg text-white">{`₱${calculateTax().toFixed(2)}`}</div>
      </div>
    </div>
  );
}

export default Cart;
