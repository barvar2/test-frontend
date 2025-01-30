import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, className }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default Input;
