"use client";

import Createlist from "@/components/Createlist";
import { useEffect, useState } from "react";
import { type List } from "@/app/page";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

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
    <div className="flex flex-col items-center gap-4 max-w-screen-2xl">
      <Link href="/">
        <button className="absolute top-10 left-32 text-lg p-2 rounded-md border-2 border-black">
          <AiFillHome />
        </button>
      </Link>
      {loading && list ? (
        <Createlist id={id} title={title} info={list.content} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default page;
