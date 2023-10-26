"use client";
import Listouter from "@/components/Listouter";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type List = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const router = useRouter();
  const [lists, setLists] = useState<List[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = (id: number) => {
    setLists((prev) => prev.filter((list) => list.id != id));
  };

  useEffect(() => {
    fetch("/api/lists")
      .then((res) => res.json())
      .then((data) => {
        setLists(data.lists.sort((a: List, b: List) => b.id - a.id));
        setIsLoading(true);
      });
  }, []);

  useEffect(() => {
    console.log(lists);
  }, [lists]);

  return (
    <div className="flex justify-between max-w-screen-2xl max-h-full p-2">
      <div className="flex flex-col mx-auto gap-2 mt-7 w-5/6 text-center">
        <h1 className="font-serif text-4xl my-6">List Maker</h1>
        <div className="flex justify-center mb-10">
          <button
            className="p-2 border-2 border-black rounded-lg text-2xl w-1/4"
            onClick={() => router.push("/newlist")}
          >
            Create List
          </button>
        </div>
        <div className="flex flex-wrap gap-4 text-center">
          {isLoading ? (
            lists.length != 0 ? (
              lists.map((list) => (
                <Listouter
                  key={list.id}
                  id={list.id}
                  title={list.title}
                  content={list.content}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <span className="text-5xl">No List to display</span>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
