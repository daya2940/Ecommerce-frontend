import React from "react";

const LocalSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Filter"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-4 mt-4"
      />
    </div>
  );
};

export default LocalSearch;
