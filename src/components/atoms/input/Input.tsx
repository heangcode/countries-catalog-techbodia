import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`mt-1 block w-full pl-6 border  p-3 border-gray-300 shadow-md focus:outline-none focus:border-none  rounded-[16px] ${className}`}
    />
  );
};

export { Input };
