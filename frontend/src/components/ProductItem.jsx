import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const Products = (product) => {
  const maxLength = 19; // Set the maximum length for the product name
  const dispatch = useDispatch();

  // Function to truncate long product names
  const truncateProductName = (name) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <>
    <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between" onClick={handleAddToCart}>
      <div> 
        <div className="font-bold text-white" title={product.name}>
          {truncateProductName(product.name)}
        </div>
        <span className="font-light text-sm text-gray-400"></span>
      </div>
      <div className="flex flex-row justify-between items-center">
        <span className="self-end font-bold text-lg text-yellow-500">₱{product.price}</span>
        <img
          src={product.image}
          className="h-14 w-14 object-cover rounded-md"
        />
      </div>
    </div>

    </>
  );
};

export default Products;
