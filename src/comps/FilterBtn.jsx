import React from "react";

const FilterBtn = ({ name, active, handleClick }) => {
  return (
    <button
      className={`filter-btn ${active ? "active" : ""}`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default FilterBtn;
