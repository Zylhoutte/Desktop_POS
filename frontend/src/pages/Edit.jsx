import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; // Import useHistory
import axios from 'axios';

const Edit = () => {
  const { productId } = useParams();
  const history = useHistory(); // Initialize useHistory

  const [product, setProduct] = useState({
    name: '',
    price: '',
    // Add other product properties as needed
  });

  useEffect(() => {
    const getProductById = async () => {
      try {
        // Fetch the specific product by ID
        const { data } = await axios.get(`/api/products/getproduct/`);
        setProduct(data); // Set the fetched product data
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    getProductById();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit updated product details
      await axios.put(`/api/products/updateproduct/${productId}`, product);
      // Redirect to the products page after successful update
      history.push('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Price:</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        {/* Add other input fields for additional product properties */}
        <div className="col-span-2">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
