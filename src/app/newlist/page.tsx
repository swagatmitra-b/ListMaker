"use client";

import Createlist from "@/components/Createlist";
import { useState, useEffect } from "react";
import Link from "next/link";

const NewList = () => {
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
  const lastListId = async () => {
    const res = await fetch("/api/savelist");
    const data = await res.json();
    setId(data.lastList.id + 1);
    setLoading(true);
  };
  useEffect(() => {
    lastListId();
  }, []);
  return (
    <div>
      <Link href="/">Home</Link>
      {loading ? (
        <Createlist id={id} title="New List" info="" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewList;
