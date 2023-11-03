import { MouseEvent } from "react";
import contextDispenser from "@/lib/contextDispenser";

const DeleteModal = () => {
  const { modal, setModal } = contextDispenser();
  const confirmation = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target.innerText == "Yes" && modal.userclicked) {
      setModal({ ...modal, clicked: false, userconfirm: true });
      return;
    }
    if (target.innerText == "Yes") {
      setModal({ ...modal, clicked: false, confirm: true });
      return;
    }
    setModal({ ...modal, clicked: false, userclicked: false });
  };
  return (
    <div
      className={`${
        modal.clicked ? "block" : "hidden"
      } fixed z-40 top-1/3 bg-sky-100 p-6 rounded-lg border-2 border-black py-10 dark:bg-neutral-900 dark:border-white`}
    >
      <h1 className="text-2xl">
        Are you sure you want to delete this{" "}
        {modal.userclicked ? "user" : "list"}?
      </h1>
      <div className="text-lg mt-5">
        <button
          className="border-2 dark:border-white dark:bg-slate-900 border-black py-2 px-6 mr-5 rounded-md bg-white"
          onClick={(e) => confirmation(e)}
        >
          Yes
        </button>
        <button
          className="border-2 dark:border-white dark:bg-slate-900 border-black py-2 px-6 ml-5 rounded-md bg-white"
          onClick={(e) => confirmation(e)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
