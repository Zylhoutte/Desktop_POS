import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Qrgenerator from './qrgenerator'


const Products = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllProducts = async () => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      const { data } = await axios.get('/api/products/getproducts');

      // Assuming each product object has a property 'qrCodeDataURL'
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

  useEffect(() => {
    getAllProducts();
  }, []);

  const filteredProducts = productData.filter((product) =>
    product._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-white">All Products</h2>

      <div className="mb-4">
        <label htmlFor="search" className="sr-only">
          Search by Product ID
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search by Product ID"
          className="border p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="text-left bg-white">Product ID</th>
            <th className="text-left bg-white">Product Name</th>
            <th className="text-left bg-white">Image</th>
            <th className="text-left bg-white">Price</th>
            <th className="text-left bg-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2 bg-white">{product._id}</td>
              <td className="border px-4 py-2 bg-white">{product.name}</td>
              <td className="border px-4 py-2 bg-white">
              <img
                  src={`images/${product.image}`} // Update this line
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="border px-4 py-2 bg-white">₱{product.price}</td>
              <td className="border px-4 py-2 bg-white">
                {/* Actions column content */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<Qrgenerator/>
    </>
  );
};

export default Products;
