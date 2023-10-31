"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const button = ref.current as HTMLButtonElement;
  const router = useRouter();
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const createUser = async () => {
    if (creds.username == "" || creds.password == "") {
      button.innerText = "The fields cannot be empty!";
      setTimeout(() => (button.innerText = "Create"), 2000);
      return;
    }
    button.innerText = "Creating..."
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(creds),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data, typeof data);
        if (typeof data == "string") {
          button.innerText = data;
          setTimeout(() => (button.innerText = "Create"), 2000);
          return;
        }
        router.push("/signin");
      } else {
        console.error("Error");
      }
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border border-black flex flex-col p-10 py-12 rounded-lg gap-5 text-center sm:w-1/4 shadow-lg">
        <h1 className="text-xl mb-5">Create your user</h1>
        <div className="flex justify-between">
          <h2 className="">Username</h2>
          <input
            type="text"
            name="username"
            className="border-2 border-black rounded-md p-1 ml-3"
            onChange={(e) =>
              setCreds({
                ...creds,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-between">
          <h2 className="">Password</h2>
          <input
            type="password"
            name="password"
            className="border-2 border-black rounded-md p-1"
            onChange={(e) =>
              setCreds({
                ...creds,
                password: e.target.value,
              })
            }
          />
        </div>
        <button
          className="border-2 border-black p-3 rounded-md text-lg"
          onClick={createUser}
          ref={ref}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Signup;
