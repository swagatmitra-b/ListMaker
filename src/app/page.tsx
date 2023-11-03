"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Themebutton from "@/components/Themebutton";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const line = "An app to help you make lists.";
  const indexRef = useRef(0);

  const animateText = () => {
    if (indexRef.current <= line.length) {
      setText(line.slice(0, indexRef.current));
      indexRef.current += 1;
    }
  };

  useEffect(() => {
    const timer = setInterval(animateText, 50);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (session) {
    redirect("/home");
  }

  return (
    <div className="relative">
      <Themebutton />
      <nav className="flex gap-7 absolute top-10 sm:right-10 right-28 justify-between">
        <Link href="/signup">
          <button className="border-2 border-black p-2 rounded-md font-semibold hover:bg-black hover:text-white ease-in duration-200 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
            Sign Up
          </button>
        </Link>
        <Link href="/signin">
          <button className="border-2 border-black p-2 -ml-3 rounded-md font-semibold hover:bg-black hover:text-white ease-in duration-200 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
            Sign In
          </button>
        </Link>
      </nav>
      <div className="min-h-screen flex justify-center items-center flex-col">
        <h1 className="font-serif text-6xl my-6 dark:text-white">Makelister</h1>
        <h3 className="text-lg dark:text-white">{text}</h3>
      </div>
      <h1 className="italic absolute right-10 bottom-4 dark:text-white">
        created by{" "}
        <a href="https://github.com/swagatmitra-b" className="underline">
          swagat
        </a>
      </h1>
    </div>
  );
};

export default Page;
