import Createlist from "@/components/Createlist";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { getServerSession } from "next-auth";

const NewList = async () => {
  const session = await getServerSession();
  const username = session?.user?.name as string;
  return (
    <div className="flex flex-col items-center gap-4 max-w-screen-2xl">
      <Link href="/home">
        <button className="sm:absolute sm:top-10 sm:left-32 text-lg p-2 rounded-md border-2 border-black absolute left-8 top-6">
          <AiFillHome />
        </button>
      </Link>
      <Createlist title="New List" info="" username={username} />
    </div>
  );
};

export default NewList;
