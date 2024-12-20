import React from 'react';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none text-gray-700"
      />
    </div>
  );
};

export default SearchBar;