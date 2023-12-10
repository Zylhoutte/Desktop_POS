import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/products/';

// Create new product
const addProduct = async (productData) => {
  const response = await axios.post(API_BASE_URL, productData);
  return response.data;
};

// Delete product
const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_BASE_URL}${productId}`);
  return response.data;
};

// Get all products
const getProduct = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

const productService = {
  addProduct,
  getProduct,
  deleteProduct,
};

export default productService;
