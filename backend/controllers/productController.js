const Product = require("../models/productModel")
const qrCode = require('qrcode');


//for add or fetch
const getProduct= async (req, res) => {
    try {

        const products = await Product.find();
        res.status(200).send(products);

    } catch(error) {
        console.log(error);
    }
}

//for add
const addProduct = async (req, res) => {
    try {
      // Assuming you have a unique identifier for each product, like product ID
      const productId = req.body.productId;
  
      // Generate QR code data (you can customize this based on your needs)
      const qrCodeData = {
        productId: productId,
        productName: req.body.name,
        // Add other product details if needed
      };
  
      // Generate the QR code as a data URL
      const qrCodeDataURL = await qrCode.toDataURL(JSON.stringify(qrCodeData));
  
      // Add the QR code data to your product data before saving it to the database
      req.body.qrCodeDataURL = qrCodeDataURL;
  
      const newProduct = new Product(req.body);
      await newProduct.save();
  
      res.status(200).json({
        message: 'Product Created Successfully!',
        qrCodeDataURL: qrCodeDataURL,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

//for update
 const updateProduct = async (req, res) => {
    try {

        await Product.findOneAndUpdate({_id: req.body.productId}, req.body, {new: true})
        res.status(201).json("Product Updated!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
}

//for delete
const deleteProduct = async (req, res) => {
    try {

        await Product.findOneAndDelete({_id: req.body.productId})
        res.status(200).json("Product Deleted!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
  };

module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}