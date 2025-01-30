"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMemes } from "../../hooks/useMemes"; // Import the hook
import MemeItem from "./MemeItem";
import EditMemeModal from "../meme-modal/EditMemeModal";
import SkeletonMeme from "../skeleton/SkeletonMeme";
import styles from "./MemeList.module.css";

const MemeList: React.FC = () => {
  const {
    memes,
    isLoading,
    setPage,
    hasMoreData,
    updateMemeNameAndUpdateState,
  } = useMemes(); // Get the API function from useMemes
  const [editingMeme, setEditingMeme] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll position tracking
  const scrollPosition = useRef(0);

  // Prevent multiple API calls during infinite scroll
  const isRequesting = useRef(false);

  // Infinite Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current && !isRequesting.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
          // If there's more data, request next page
          if (hasMoreData) {
            isRequesting.current = true;
            setPage((prev) => prev + 1); // Increment the page number to load more memes
          } else {
            // If no more data, start cycling through the memes
            setPage(1); // Reset the page to 1 to loop through previously loaded memes
          }
        }

        // Store the current scroll position
        scrollPosition.current = scrollTop;
      }
    };

    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLoading, setPage, memes, hasMoreData]);

  // After memes are updated, restore the scroll position
  useEffect(() => {
    if (!isLoading && listRef.current) {
      listRef.current.scrollTop = scrollPosition.current;
      isRequesting.current = false;
    }
  }, [memes, isLoading]);

  // Handle saving the updated meme name
  const onSave = async (id: string, newName: string) => {
    try {
      // Call the function to update meme name and state
      await updateMemeNameAndUpdateState(id, newName); // This will call both backend and frontend update
    } catch (error) {
      console.error("Failed to update meme:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Spacer to create 20px gap below header */}
      <div className={styles.headerSpacer}></div>

      {/* Scrollable Meme Grid */}
      <div ref={listRef} className={styles.memeGrid}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonMeme key={index} />
            ))
          : memes.map((meme) => (
              <MemeItem
                key={meme._id}
                meme={meme}
                onEdit={(id, name) => setEditingMeme({ id, name })}
              />
            ))}

        {editingMeme && (
          <EditMemeModal
            isOpen={!!editingMeme}
            memeId={editingMeme.id}
            currentName={editingMeme.name}
            onClose={() => setEditingMeme(null)}
            onSave={onSave} 
          />
        )}
      </div>
    </div>
  );
};

export default MemeList;
