import { json } from "@remix-run/node";
import React from "react";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const herbRes = await fetch(`http://127.0.0.1:5000/herbs`);
  let data = await herbRes.json();
  const herbs = Object.values(data); // Convert herb data object to an array

  return json({
    herbs,
  });
}

export default function Herb() {
  const { herbs } = useLoaderData();

  return (
    <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-8 mx-auto">
      <ul className="gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 grid grid-cols-2">
        {herbs.map((herb) => (
          <li key={herb.id} className="relative">
            <a href={`/herb/${herb.name}`}>
              <div className="group h-198 aspect-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 block w-full overflow-hidden bg-gray-100 rounded-lg">
                {herb.scientific_name ? (
                  <img
                    src={`/herb_images/${herb.scientific_name.replace(
                      / /g,
                      "_"
                    )}.jpg`}
                    alt=""
                    className="group-hover:opacity-75 object-cover w-full h-full pointer-events-none"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/280x198";
                    }}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      height: "198px",
                      width: "280px",
                    }}
                  />
                ) : (
                  <img
                    src="https://placehold.co/280x198"
                    alt=""
                    className="object-cover object-center w-full h-full"
                  />
                )}
                <button
                  type="button"
                  className="focus:outline-none absolute inset-0"
                >
                  <span className="sr-only">View details for {herb.name}</span>
                </button>
              </div>
              <p className="block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">
                {herb.name}
              </p>
              <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                {herb.scientific_name ? (
                  <span>{herb.scientific_name}</span>
                ) : (
                  <span className="italic"></span>
                )}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
