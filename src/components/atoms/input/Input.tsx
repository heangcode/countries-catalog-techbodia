import React from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

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
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <HiOutlineMagnifyingGlass className="h-5 w-5 text-gray-500" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full pl-10 p-2 border-gray-300 shadow-sm border  focus:border-gray-300 focus:outline-none rounded-md"
      />
    </div>
  );
};

export { Input };
