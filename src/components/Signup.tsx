"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const createUser = async () => {
    if (creds.username == "" || creds.password == "") {
      console.log('Cannot be empty')
      return;
    }
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
        console.log(data);
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
      <div className="border border-black flex flex-col p-10 py-12 rounded-lg gap-5 text-center w-1/4">
        <h1 className="text-xl mb-5">Create your user</h1>
        <div className="flex justify-between">
          <h2 className="">Username</h2>
          <input
            type="text"
            name="username"
            className="border-2 border-black rounded-md p-1"
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
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Signup;
