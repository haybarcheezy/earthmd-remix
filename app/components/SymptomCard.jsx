import React from "react";

function SymptomCard({ herb }) {
  if (!herb) {
    return null; // or return a placeholder component
  }

  return (
    <li className="relative">
      <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
        <img
          src={
            `/herb_images/${herb.scientific_name}`.replace(/\s/g, "_") + ".jpg"
          }
          alt={herb.name}
          style={{ width: "280px", height: "196px" }}
          className="object-cover pointer-events-none group-hover:opacity-75"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/280x196"; // Placeholder image
          }}
        />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {herb.name}</span>
        </button>
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        {herb.name}
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">
        {herb.scientific_name}
      </p>
    </li>
  );
}

export default SymptomCard;
