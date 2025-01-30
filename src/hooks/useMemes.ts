import { useState, useEffect } from "react";
import { fetchMemes, updateMemeName } from "../api/memesApi"; // Import API functions
import { Meme } from "../types/meme";

export const useMemes = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  // Function to load memes from API
  const loadMemes = async () => {
    if (isLoading || !hasMoreData) return;
    setIsLoading(true);

    try {
      const newMemes = await fetchMemes(page);
      if (newMemes.length === 0) {
        setHasMoreData(false);
      } else {
        setMemes((prev) => [...prev, ...newMemes]);
      }
    } catch (error) {
      console.error("Error fetching memes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch memes when the page changes
  useEffect(() => {
    loadMemes();
  }, [page]);

  // Function to update a meme's name after the backend response
  const updateMemeNameLocally = (id: string, newName: string) => {
    setMemes((prevMemes) =>
      prevMemes.map((meme) =>
        meme._id === id ? { ...meme, name: newName } : meme
      )
    );
  };

  // Function to update meme's name (API call and frontend update)
  const updateMemeNameAndUpdateState = async (id: string, newName: string) => {
    try {
      // Call the API to update the meme name on the backend
      const updatedMeme = await updateMemeName(id, newName); // API request
      // After the API responds, update the meme's name in the local state
      updateMemeNameLocally(id, updatedMeme.name); // Update the meme name locally
    } catch (error) {
      console.error("Failed to update meme:", error);
    }
  };

  return {
    memes,
    isLoading,
    setPage,
    hasMoreData,
    updateMemeNameAndUpdateState,
  }; 
};
