import React from "react";
import styles from "./MemeItem.module.css";

interface MemeItemProps {
  meme: { _id: string; name: string; url: string };
  onEdit: (id: string, name: string) => void;
}

const MemeItem: React.FC<MemeItemProps> = ({ meme, onEdit }) => {
  return (
    <div className={styles.card}>
      <img src={meme.url} alt={meme.name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.name}>{meme.name}</h3>
        <button className={styles.editButton} onClick={() => onEdit(meme._id, meme.name)}>
          ✏️ Edit
        </button>
      </div>
    </div>
  );
};

export default MemeItem;
