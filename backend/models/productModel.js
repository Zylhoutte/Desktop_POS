const mongoose = require('mongoose');
const qrcode = require('qrcode');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    qrCodeDataURL: {
      type: String,
      default: '', // You can set a default value or leave it as an empty string
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to generate QR code data URL before saving the product
productSchema.pre('save', async function (next) {
  try {
    // Assuming you have a unique identifier for each product, like _id
    const productId = this._id;

    // Generate QR code data (customize this based on your needs)
    const qrCodeData = {
      productId: productId,
      productName: this.name,
      // Add other product details if needed
    };

    // Generate the QR code as a data URL
    const qrCodeDataURL = await qrcode.toDataURL(JSON.stringify(qrCodeData));

    // Add the QR code data URL to the product
    this.qrCodeDataURL = qrCodeDataURL;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Product', productSchema);
