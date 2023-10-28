"use client";
import Listouter from "@/components/Listouter";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/DeleteModal";
import { List } from "@/lib/types";
import { DeleteContext } from "@/lib/contextDispenser";

export default function Home() {
  const router = useRouter();
  const [lists, setLists] = useState<List[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    id: 0,
    clicked: false,
    confirm: false,
  });

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/deletelist", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setLists((prev) => prev.filter((list) => list.id != id));
        setModal({ ...modal, confirm: false });
      } else {
        console.log("ERROR!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch("/api/lists")
      .then((res) => res.json())
      .then((data) => {
        setLists(data.lists.sort((a: List, b: List) => b.id - a.id));
        setIsLoading(true);
      });
  }, []);

  // useEffect(() => {
  //   console.log(lists);
  // }, [lists]);
  useEffect(() => {
    if (modal.confirm) handleDelete(modal.id);
  }, [modal.confirm]);

  return (
    <div className="flex justify-between max-w-screen-2xl max-h-full p-2">
      <DeleteContext.Provider value={{ modal, setModal }}>
        <div className="flex flex-col mx-auto gap-2 mt-7 w-5/6 text-center">
          <h1 className="font-serif text-4xl my-6">Makelister</h1>
          <div className="flex justify-center mb-10">
            <button
              className="p-2 border-2 border-black rounded-lg text-2xl w-1/4"
              onClick={() => router.push("/newlist")}
            >
              Create List
            </button>
            <DeleteModal />
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
                  />
                ))
              ) : (
                <div className="w-full text-center mt-48">
                  <span className="text-4xl">No List to display</span>
                </div>
              )
            ) : (
              <div className="w-full text-center mt-48">
                <span className="text-4xl">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </DeleteContext.Provider>
    </div>
  );
}
