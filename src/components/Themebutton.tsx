"use client";
import { useTheme } from "next-themes";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useEffect, useState } from "react";

const Themebutton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;
  return (
    <button
      className={`${
        theme == "light" ? "border-black" : "border-white"
      } border-2 p-3 rounded-md absolute sm:top-10 left-10 top-10`}
      onClick={() => (theme == "light" ? setTheme("dark") : setTheme("light"))}
    >
      {theme == "light" ? <BsMoonFill /> : <BsSunFill />}
    </button>
  );
};

export default Themebutton;
