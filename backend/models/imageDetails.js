const mongoose = require("mongoose");

const ImageDetailsSchema = mongoose.Schema(
  {
    image: String,
  },
  {
    collection: "ImageDetails",
  }
);

// Fix: Use the defined schema when creating the model
const Images = mongoose.model("ImageDetails", ImageDetailsSchema);

// Optionally, you can export the model if needed
module.exports = Images;
