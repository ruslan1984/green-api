import { createContext, useContext } from "react";
import AuthStore from "./authStore";

export interface IStores {
  authStore: AuthStore;
}

export const StoreContext = createContext<IStores | null>(null);

export function useStores() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStores must be used within StoreContext.Provider");
  return context;
}
