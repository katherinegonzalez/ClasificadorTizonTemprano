import { createContext } from "react";

export const AppContext = createContext({
    openModal: false,
    setopenModal: () => {},  
    isAuth: false,
    setIsAuth: ()  => {},
    showError: false,
    setShowError: () => {}
  });