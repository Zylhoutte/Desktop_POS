import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCartFromScanner } from '../features/cart/cartSlice';

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get('/api/products/getproducts');
        setProductData(data);
        dispatch({
          type: "HIDE_LOADING",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, [dispatch]);

  const handleSearch = () => {
    const foundProduct = productData.find(product => product._id === searchInput);

    if (foundProduct) {
      dispatch(addToCartFromScanner({
        _id: foundProduct._id,
        // Provide other details from the found product if needed
      }));
    } else {
      console.log('Product not found');
      // Handle the case when the product is not found
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {scanResult ? (
        <div className="text-white">
          Success: <a href={scanResult} className="text-white">{scanResult}</a>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div id="qrreader" className="w-64 h-64 border border-gray-300"></div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Enter product ID"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="p-2 border border-gray-300 rounded-l"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white p-2 rounded-r"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
