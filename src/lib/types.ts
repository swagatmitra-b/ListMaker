import { Dispatch, SetStateAction } from "react";
export type List = {
  id: number;
  title: string;
  content: string;
};

export type ContextValue = {
  modal: {
    id: number;
    clicked: boolean;
    confirm: boolean;
  };
  setModal: Dispatch<
    SetStateAction<{
      id: number;
      clicked: boolean;
      confirm: boolean;
    }>
  >;
};
