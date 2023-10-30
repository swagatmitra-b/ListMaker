"use client";
import Listouter from "@/components/Listouter";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/DeleteModal";
import { List } from "@/lib/types";
import { DeleteContext } from "@/lib/contextDispenser";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session?.user?.name, status);
  const username = session?.user?.name as string;
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
      const res = await fetch("/api/userdeletelist", {
        method: "DELETE",
        body: JSON.stringify({ id, username }),
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
    fetch("/api/usergetlist", {
      method: "POST",
      body: JSON.stringify({
        username: session?.user?.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLists(data.post.sort((a: List, b: List) => b.id - a.id));
        setIsLoading(true);
        console.log(data.post);
      });
  }, []);

  useEffect(() => {
    if (modal.confirm) handleDelete(modal.id);
  }, [modal.confirm]);

  if (status == "unauthenticated") {
    console.log("user not authed");
    return;
  }

  return (
    <div className="flex justify-between max-w-screen-2xl max-h-full p-2 relative">
      <DeleteContext.Provider value={{ modal, setModal }}>
        <div className="flex flex-col mx-auto gap-2 mt-7 w-5/6 text-center">
          <h1 className="font-serif text-4xl my-6">Makelister</h1>
          <div className="flex flex-col gap-2 italic mb-4">
            <h1>Logged in as {username}</h1>
          </div>
          <button
            className="border-2 border-black p-1 rounded-md text-sm absolute top-16 right-28 font-semibold px-2"
            onClick={() => {
              signOut();
              router.push("/signin");
            }}
          >
            Sign Out
          </button>
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
