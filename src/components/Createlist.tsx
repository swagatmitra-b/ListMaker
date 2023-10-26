"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";

interface Info {
  id: number;
  title: string;
  info: string;
}

const Createlist = ({ id, title, info }: Info) => {
  const path = usePathname();
  const router = useRouter();
  const [listTitle, setListTitle] = useState(title);
  const [listMembers, setListMembers] = useState(info.split(";"));

  const add = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const id = Number(target.parentElement?.getAttribute("id"));
    const updatedListMembers = [...listMembers];
    updatedListMembers.splice(id + 1, 0, "");
    setListMembers(updatedListMembers);
  };

  const del = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const id = Number(target.parentElement?.getAttribute("id"));
    const updatedListMembers = [...listMembers];
    updatedListMembers.splice(id, 1);
    setListMembers(updatedListMembers);
  };

  useEffect(() => {
    console.log(listMembers);
  }, [listMembers]);

  const up = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.parentElement?.parentElement?.getAttribute("id"));
    if (id == 0) return;
    else {
      let updatedList = [...listMembers];
      const temp = updatedList[id - 1];
      updatedList[id - 1] = updatedList[id];
      updatedList[id] = temp;
      setListMembers(updatedList);
    }
  };
  const down = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.parentElement?.parentElement?.getAttribute("id"));
    if (listMembers.length - 1 == id) return;
    else {
      let updatedList = [...listMembers];
      const temp = updatedList[id + 1];
      updatedList[id + 1] = updatedList[id];
      updatedList[id] = temp;
      setListMembers(updatedList);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.parentElement?.getAttribute("id"));
    let updatedList = [...listMembers];
    updatedList[id] = e.target.value;
    setListMembers(updatedList);
  };

  const saveList = async () => {
    try {
      const res = await fetch("/api/savelist", {
        method: "POST",
        body: JSON.stringify({ id, title: listTitle, listMembers }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.error(data);
      } else {
        console.error("Error:");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const createList = async () => {
    try {
      const res = await fetch("/api/createlist", {
        method: "POST",
        body: JSON.stringify({ title: listTitle, listMembers }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.error(data);
        router.push('/');
      } else {
        console.error("Error:");
      }
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    console.log(listTitle);
  }, [listTitle]);
  return (
    <div className="min-h-screen items-center flex justify-center flex-col gap-4">
      <input
        type="text"
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
      />
      <button
        className="p-2 border-2 border-black rounded-md"
        onClick={(e) => {
          const target = e.target as HTMLButtonElement;
          if (target.innerText == "Create") createList();
          else saveList();
        }}
      >
        {path == "/newlist" ? "Create" : "Save"}
      </button>
      {listMembers.map((list, i) => (
        <div className="flex gap-4" key={i} id={String(i)}>
          <span className="text-lg">{i + 1}</span>
          <input
            type="text"
            value={list}
            className="border-2 border-black rounded-sm h-14 text-2xl pl-2 w-4/6"
            onChange={handleChange}
          />
          <button className="border-2 border-black p-2 text-lg" onClick={add}>
            +
          </button>
          <button className="border-2 border-black p-2 text-lg" onClick={del}>
            Del
          </button>
          <div className="flex flex-col">
            <button className="border-2 border-black p-1" onClick={up}>
              Up
            </button>
            <button className="border-2 border-black p-1" onClick={down}>
              dn
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Createlist;
