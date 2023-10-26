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

  return (
    <div className="min-h-screen flex justify-between items-center ml-20">
      <div className="flex flex-col mx-auto gap-2">
        <button
          className="p-2 border-2 border-black rounded-lg"
          onClick={() => router.push("/newlist")}
        >
          Create List
        </button>
        <div className="flex flex-wrap gap-4">
          {isLoading ? (
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
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
