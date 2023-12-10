import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCart,
  deleteFromCart,
  incrementItem,
  decrementItem,
} from '../features/cart/cartSlice';
import Scanner from './Scanner';

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleIncrement = (itemId) => {
    dispatch(incrementItem({ _id: itemId }));
  };

  const handleDecrement = (itemId, quantity) => {
    if (quantity > 1) {
      dispatch(decrementItem({ _id: itemId }));
    } else {
      dispatch(deleteFromCart({ _id: itemId }));
    }
  };

  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };


  return (
    <div>
      <Scanner/>
      {/* Display cart items */}
      {cartItems.map((item, index) => (
        <div key={index} className="flex flex-row justify-between items-center mb-4">
          {/* Product details */}
          <div className="flex flex-row items-center w-2/5">
            <span className="ml-4 font-semibold text-sm text-white">{item.name}</span>
          </div>
          {/* Quantity controls */}
          <div className="w-32 flex justify-between">
            {/* Decrement button */}
            <button
              className="px-3 py-1 rounded-md bg-gray-300 hover:bg-red-500 transition-colors duration-300"
              onClick={() => handleDecrement(item._id, item.quantity)}
            >
              -
            </button>
            {/* Quantity display */}
            <span className="font-semibold mx-4 text-white">{item.quantity}</span>
            {/* Increment button */}
            <button
              className="px-3 py-1 rounded-md bg-gray-300 hover:bg-red-500 transition-colors duration-300"
              onClick={() => handleIncrement(item._id)}
            >
              +
            </button>
          </div>

          {/* Total price */}
          <div className="font-semibold text-lg w-16 text-center text-white">
            ₱{calculateTotalPrice(item)}
          </div>
        </div>
      ))}

    </div>
  );
}

export default Cart;
