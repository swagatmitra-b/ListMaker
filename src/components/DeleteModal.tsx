import { MouseEvent } from "react";
import { contextDispenser } from "@/app/page";

const DeleteModal = () => {
  const { modal, setModal } = contextDispenser();
  const confirmation = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target.innerText == "Yes") {
      setModal({ ...modal, clicked: false, confirm: true });
    } else setModal({ ...modal, clicked: false });
  };
  return (
    <div
      className={`${
        modal.clicked ? "block" : "hidden"
      } fixed z-40 top-1/3 bg-gray-400 p-6 rounded-lg border-2 border-black py-10`}
    >
      <h1 className="text-2xl">Are you sure you want to delete this list?</h1>
      <div className="text-lg mt-5">
        <button
          className="border-2 border-black py-2 px-6 mr-5 rounded-md bg-white"
          onClick={(e) => confirmation(e)}
        >
          Yes
        </button>
        <button
          className="border-2 border-black py-2 px-6 ml-5 rounded-md bg-white"
          onClick={(e) => confirmation(e)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
