import React, { useState } from "react";
import styles from "./EditMemeModal.module.css";
import { updateMemeName } from "../../api/memesApi";

interface EditMemeModalProps {
  isOpen: boolean;
  memeId: string;
  currentName: string;
  onClose: () => void;
  onSave: (id: string, newName: string) => void;
}

const EditMemeModal: React.FC<EditMemeModalProps> = ({
  isOpen,
  memeId,
  currentName,
  onClose,
  onSave,
}) => {
  const [newName, setNewName] = useState(currentName);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (newName.trim() === "" || isUpdating) return;

    setIsUpdating(true);

    try {
      await updateMemeName(memeId, newName); // ✅ Update meme in db
      onSave(memeId, newName); //  Update state in frontend
      onClose();
    } catch (error) {
      console.error("Error updating meme:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Edit Meme Name</h2>
        <input
          className={styles.input}
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          disabled={isUpdating}
        />
        <div className={styles.buttonContainer}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isUpdating}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMemeModal;
