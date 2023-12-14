import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null); // Use null for File
  const [productBrand, setProductBrand] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCountInStock, setProductCountInStock] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productCountInStock) {
      toast.error('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('image', productImage);
    formData.append('image', file);
    formData.append('brand', productBrand);
    formData.append('category', productCategory);
    formData.append('description', productDescription);
    formData.append('countInStock', productCountInStock);

    try {
      const response = await axios.post('api/products/addproducts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response from server:', response.data);

      toast.success('Product created successfully');

      setProductName('');
      setProductPrice('');
      setProductImage(null);
      setProductBrand('');
      setProductCategory('');
      setProductDescription('');
      setProductCountInStock('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating product');
    }
  };


  return (
    <div className="container mx-auto mt-8">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Product Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
      
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Product Brand:</label>
          <input
            type="text"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Product Category:</label>
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4 col-span-2">
          <label className="block text-sm font-medium text-white">Product Description:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Count In Stock:</label>
          <input
            type="number"
            value={productCountInStock}
            onChange={(e) => setProductCountInStock(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>

 

        <div className="col-span-2">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
