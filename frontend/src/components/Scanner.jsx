import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from "../features/cart/cartSlice";

const CombinedComponent = () => {
  const [productData, setProductData] = useState([]);
  const [scanResult, setScanResult] = useState(null);
  const [scannedProduct, setScannedProduct] = useState(null);
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      const { data } = await axios.get('/api/products/getproducts');

      setProductData(
        data.map((product) => ({
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
        }))
      );

      dispatch({
        type: 'HIDE_LOADING',
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: 'HIDE_LOADING',
      });
      console.log(error);
    }
  };

  const searchProductById = (productId) => {
    return productData.find((product) => product._id === productId);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qrreader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
      facingMode: { id: 1 },
    });

    const success = async (result) => {
      // Clear the scanner
      scanner.clear();

      // Set the scan result
      setScanResult(result);

      // Search for the product by ID
      const scannedProduct = searchProductById(result);
      setScannedProduct(scannedProduct);

      // Automatically add the scanned product to the cart
      if (scannedProduct) {
        dispatch(addToCart(scannedProduct)); // Assuming addToCart takes the product as an argument
        console.log(`Product with ID ${scannedProduct._id} added to cart`);
      }
    };

    const error = (err) => {
      console.warn(err);
    };

    scanner.render(success, error);

    // Cleanup the scanner when the component is unmounted
    return () => {
      scanner.clear();
    };
  }, [dispatch, productData]);

  return (
    <div className="bg-gray-200"> {/* Adjust the background color class based on your design */}
      {scanResult ? (
        <div className="text-black">
          Success: <a href={scanResult} className="text-black">{scanResult}</a>
          {scannedProduct && (
            <div>
              Scanned Product ID: {scannedProduct._id}
              {/* Display additional information based on the scanned product */}
            </div>
          )}
        </div>
      ) : (
        <div id="qrreader" />
      )}
    </div>
  );
};

export default CombinedComponent;
