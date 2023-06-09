import { json } from "@remix-run/node";
import React, { useState } from "react";
import { useSearchParams, useLoaderData, useParams } from "@remix-run/react";
import HerbCard from "../components/HerbCard";

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const pageSize = parseInt(searchParams.get("pageSize") || 15);
  const page = parseInt(searchParams.get("page") || 0);

  const herbRes = await fetch(
    `http://127.0.0.1:5000/herbs?herb_name=${params.herb}`
  );
  let data = await herbRes.json();
  const herb = data[params.herb]; // Access the herb data using the herb name key

  return json({
    herb,
  });
}

export default function Herb() {
  const { herb } = useLoaderData();

  return (
    <div className="sm:px-6 lg:px-8 max-w-6xl px-4 py-12 mx-auto">
      <HerbCard herb={herb} />
    </div>
  );
}
