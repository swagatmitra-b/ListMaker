import Link from "next/link";
import { type List } from "@/app/page";
import { MouseEvent } from "react";

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
      <div className="border border-gray-800 max-w-md rounded-lg cursor-pointer relative">
        <button
          className="absolute right-2 border-2 border-black p-1 rounded-lg top-2"
          onClick={(e) => delList(e)}
        >
          Del
        </button>
        <div className="p-20">
          <h1>{title}</h1>
          <p>{content.split(";")[0]}</p>
        </div>
      </div>
    </Link>
  );
};

export default Listouter;
