import React, { useEffect, useRef } from "react";

function SearchBar({ onSearch }) {

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {

    const value = e.target.value;

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      onSearch(value);
    }, 400);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search country..."
      onChange={handleChange}
      className="border p-2 rounded w-full"
    />
  );
}

export default SearchBar;