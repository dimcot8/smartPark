import React, { useState } from "react";

function SearchBar({ onSearch, inputClassName, buttonClassName }) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(location);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className={inputClassName}
      />
      <button type="submit" className={buttonClassName}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
