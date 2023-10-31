"use client";
import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signin = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const button = ref.current as HTMLButtonElement;
  const router = useRouter();
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const loginUser = async () => {
    button.innerText = "Signing in...";
    const res = await signIn("credentials", {
      ...creds,
      redirect: false,
    });
    console.log(res);
    if (res?.error) {
      button.innerText = "Credentials error!";
      setTimeout(() => (button.innerText = "Sign in"), 2000);
    } else {
      router.push("/home");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border border-black flex flex-col p-10 py-12 rounded-lg gap-5 text-center sm:w-1/4 shadow-lg">
        <h1 className="text-xl mb-5">Sign in with your user</h1>
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
          onClick={loginUser}
          ref={ref}
        >
          Sign in
        </button>
        <h1>
          Don't have an account? <a href="/signup" className="underline text-blue-700">signup</a>
        </h1>
      </div>
    </div>
  );
};

export default Signin;
