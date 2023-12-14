import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5001/api/upload', formData);
      console.log(response.data);

      // Assuming the server responds with the URL of the uploaded image
      setImageUrl(response.data.url);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
    <h1 className="text-3xl font-semibold mb-4">Image Upload</h1>
    <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
    <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
      Upload Image
    </button>

    {imageUrl && (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Uploaded Image:</h2>
        <img src={imageUrl} alt="Uploaded" className="max-w-full text-white" />
      </div>
    )}
  </div>
  );
};

export default ImageUploadForm;
