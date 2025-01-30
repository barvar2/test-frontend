import axios from "axios";

// Get API base URL from environment variables
const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/memes` || "http://localhost:3001/memes";

// Fetch memes with pagination
export const fetchMemes = async (page: number) => {
  const response = await axios.get(`${API_BASE_URL}?page=${page}`);
  return response.data;
};

// Update meme name
export const updateMemeName = async (id: string, newName: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, {
      name: newName,
    });
    return response.data; // Return the updated meme data
  } catch (error) {
    console.error("Error updating meme name:", error);
    throw error;
  }
};
