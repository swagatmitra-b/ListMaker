import Createlist from "@/components/Createlist";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

const NewList = () => {
  return (
    <div className="flex flex-col items-center gap-4 max-w-screen-2xl">
      <Link href="/">
        <button className="absolute top-10 left-32 text-lg p-2 rounded-md border-2 border-black">
          <AiFillHome />
        </button>
      </Link>
      <Createlist title="New List" info="" />
    </div>
  );
};

export default NewList;
