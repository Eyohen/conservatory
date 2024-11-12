import React, { useEffect, useState } from 'react';
import { URL } from '../url';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditCrockery = () => {
  const { id: crockeryId } = useParams();
  const navigate = useNavigate();
  const [crockery, setCrockery] = useState({
    name: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    fetchCrockery();
  }, [crockeryId]);

  const fetchCrockery = async () => {
    try {
      const res = await axios.get(`${URL}/api/crockerys/${crockeryId}`);
      setCrockery({
        name: res.data.crockery,
        description: res.data.description
      });
      setCurrentImage(res.data.image);
    } catch (err) {
      setError('Error fetching crockery details');
      console.error("Error fetching crockery:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCrockery(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const updateCrockeryDetails = async () => {
    try {
      const res = await axios.put(`${URL}/api/crockerys/${crockeryId}`, {
        crockery: crockery.name,
        description: crockery.description
      });
      return res.data;
    } catch (err) {
      throw new Error('Failed to update crockery details');
    }
  };

  const uploadImage = async () => {
    if (!file) return null;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await axios.put(`${URL}/api/crockerys/${crockeryId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch (err) {
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      // Update crockery details
      await updateCrockeryDetails();

      // If there's a new image, upload it separately
      if (file) {
        await uploadImage();
      }

      setSuccessMessage('Crockery updated successfully');
      setTimeout(() => navigate('/crockerytable'), 1500);
    } catch (err) {
      setError(err.message || 'An error occurred while updating the crockery');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Crockery</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Crockery Name
          </label>
          <input
            type="text"
            name="name"
            value={crockery.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-[#F08E1F] rounded focus:outline-none focus:ring-2 focus:ring-[#F08E1F]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={crockery.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-[#F08E1F] rounded focus:outline-none focus:ring-2 focus:ring-[#F08E1F]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Current Image
          </label>
          {currentImage && (
            <img 
              src={currentImage} 
              alt="Current crockery"
              className="w-32 h-32 object-cover rounded mb-2" 
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-[#F08E1F] rounded focus:outline-none focus:ring-2 focus:ring-[#F08E1F]"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#F08E1F] text-white py-2 px-4 rounded hover:bg-[#E07D0E] transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Updating...' : 'Update Crockery'}
          </button>
          
          <Link
            to="/crockerytable"
            className="flex-1 text-center py-2 px-4 border border-[#F08E1F] text-[#F08E1F] rounded hover:bg-[#FFF5E9] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditCrockery;