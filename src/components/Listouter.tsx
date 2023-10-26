import Link from "next/link";
import { type List } from "@/app/page";
import { MouseEvent } from "react";
import { FaTrash } from "react-icons/fa";

interface Props extends List {
  onDelete: (id: number) => void;
}

const Listouter = ({ id, title, content, onDelete }: Props) => {
  const delList = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
        onDelete(id);
      } else {
        console.log("ERROR!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Link href={`${id} ${title}`}>
      <div className="border-2 border-gray-800 max-w-md rounded-lg cursor-pointer relative">
        <button
          className="absolute right-1 border-2 border-black p-2 rounded-lg top-1"
          onClick={(e) => delList(e)}
        >
          <FaTrash/>
        </button>
        <div className="px-16 py-10">
          <h1 className="text-3xl">{title}</h1>
          <p className="text-lg mt-5">{content.split(";")[0]}</p>
        </div>
      </div>
    </Link>
  );
};

export default Listouter;
