import axios from "axios";

const API_BASE_URL = "http://localhost:3001/memes"; // Ensure this matches your backend

// Fetch all memes
export const fetchMemes = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Update a meme's name in MongoDB
export const updateMeme = async (id: string, newName: string) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, { name: newName });
  return response.data; // ✅ Returns the updated meme
};
