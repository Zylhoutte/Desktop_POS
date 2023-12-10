import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Productitem from './ProductItem'
import Cart from './Cart'
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import Total from '../components/Total'
import ProductModal from '../components/ProductModal'


const YourComponent = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
        try {
          dispatch({
            type: "SHOW_LOADING",
          });
          const {data} = await axios.get('/api/products/getproducts');
          setProductData(data);
          dispatch({
            type: "HIDE_LOADING",
          });
          console.log(data);

        } catch(error) {
          console.log(error);
        }
      };

      getAllProducts();
  }, [dispatch]);

  const handleClearAll = () => {
    // Dispatch the clearCart action to remove all items from the cart
    dispatch(clearCart());
  };
  

  

  return (
    <div className="container mx-auto px-5 bg-gray-800 h-auto">
      <div className="flex lg:flex-row flex-col-reverse shadow-lg">
        {/* Left section */}
        <div className="w-full lg:w-3/5 min-h-screen h-auto shadow-lg">
          {/* Header */}
          <div className="flex flex-row justify-between items-center px-5 mt-5">
            <div className="text-gray-800">
              <div className="font-bold text-xl"></div>
              <span className="text-xs"></span>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-center mr-4">
                <div className="font-light text-gray-500"></div>
                <span className="font-semibold"></span>
              </div>
              <div>
             
              </div>
            </div>
          </div>
          {/* End Header */}
          {/* Categories */}
          <div className="mt-5 flex flex-row px-5">
            <span className="px-5 py-1 bg-yellow-500 rounded-2xl text-white text-sm mr-4">
              All items
            </span>
          </div>
          {/* End Categories */}
          {/* Products */}
          <div className="grid grid-cols-3 gap-4 px-5 mt-5 overflow-y-auto ">
          {productData.map((product, index) => (
        <Productitem key={index} {...product} />
      ))}
          </div>
          {/* End Products */}
        </div>
        {/* End Left Section */}
        {/* Right Section */}
        <div className="w-full lg:w-2/5">
          {/* Header */}
          <div className="flex flex-row items-center justify-between px-5 mt-5">
            <div className="font-bold text-xl">Current Order</div>
            <div className="font-semibold">
            <span
              className="px-4 py-2 rounded-md bg-red-100 text-red-500 cursor-pointer"
              onClick={handleClearAll}
            >
              Clear All
            </span>
          
            </div>
          </div>
          {/* End Header */}
          {/* Order List */}
          <div className="px-5 py-4 mt-5 overflow-y-auto h-64">
          <Cart/>
          </div>
          {/* End Order List */}
          {/* Total Items */}
          <div className="px-5 mt-5">
            <div className="py-4 rounded-md shadow-lg">
            <Total/>
            </div>
          </div>
          {/* End Total Items */}
          {/* Cash */}
          <div className="px-5 mt-5">
            <div className="rounded-md shadow-lg px-4 py-4">
              {/* Cash Information goes here */}
            </div>
          </div>
          {/* End Cash */}
          {/* Button Pay */}
          <div className="px-5 mt-5">
   
              <ProductModal/>
        
          </div>
          {/* End Button Pay */}
        </div>
        {/* End Right Section */}
      </div>
    </div>
  );
};

export default YourComponent;
