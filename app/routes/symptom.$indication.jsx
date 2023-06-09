import { json } from "@remix-run/node";
import React from "react";
import { useLoaderData } from "@remix-run/react";
import SymptomCard from "../components/SymptomCard";

export async function loader({ request, params }) {
  const herbRes = await fetch(
    `http://127.0.0.1:5000/herbs?symptom=${params.indication}`
  );
  let data = await herbRes.json();
  const herbs = Object.values(data);
  const title = params.indication;

  return json({
    herbs,
    title,
  });
}

export default function Symptom() {
  const { herbs, title } = useLoaderData();

  return (
    <div className="sm:px-6 lg:px-8 max-w-6xl px-4 py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Herbs for {title}</h1>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {herbs.map((herb, index) => (
          <SymptomCard key={index} herb={herb} />
        ))}
      </ul>
    </div>
  );
}
