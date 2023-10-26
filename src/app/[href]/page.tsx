"use client";

import Createlist from "@/components/Createlist";
import { useEffect, useState } from "react";
import { type List } from "@/app/page";
import Link from "next/link";

const page = ({ params }: any) => {
  let [stringId, ...rest] = decodeURI(params.href).split(" ");
  const id = +stringId;
  const title = rest.join(" ");
  const [list, setList] = useState<List | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("/api/lists", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data.list);
        setLoading(true);
      });
  }, []);

  return (
    <div className="flex justify-center gap-4">
      <Link href="/">Home</Link>
      {loading && list ? (
        <Createlist id={id} title={title} info={list.content} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default page;
