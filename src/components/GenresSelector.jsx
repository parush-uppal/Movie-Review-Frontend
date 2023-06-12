import React from "react";
import { ImTree } from "react-icons/im";

export default function GenresSelector({ badge, onClick }) {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="bg-dark-subtle text-white absolute top-0 right-0 translate-x-2 -translate-y-1 text-xs w-5 h-5 rounded-full flex justify-center items-center">
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex items-center space-x-2 py-1 px-3 border-2 border-dark-subtle text-light-subtle hover:text-white rounded"
    >
      <ImTree />
      <span>Select Genres</span>
      {renderBadge()}
    </button>
  );
}
