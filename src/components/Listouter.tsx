import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { List } from "@/lib/types";
import contextDispenser from "@/lib/contextDispenser";

const Listouter = ({ id, title, content }: List) => {
  const { modal, setModal } = contextDispenser();
  return (
    <Link href={`/home/${id} ${title}`}>
      <div className="border-2 border-gray-800 max-w-md rounded-lg cursor-pointer relative shadow-xl dark:border-white">
        <button
          className="absolute right-1 border-2 border-black p-2 rounded-lg top-1 dark:border-white"
          onClick={(e) => {
            e.preventDefault();
            setModal({ ...modal, clicked: true, id });
          }}
        >
          <FaTrash />
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
