import { createContext, useContext } from "react";
import { ContextValue } from "./types";

export const DeleteContext = createContext<ContextValue | null>(null);

const contextDispenser = () => {
  const values = useContext(DeleteContext) as ContextValue;
  return values;
};

export default contextDispenser;
