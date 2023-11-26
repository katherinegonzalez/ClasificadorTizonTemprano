import { createContext } from "react";

export const AppContext = createContext({
    openModal: false,
    setopenModal: () => {},  
    isAuth: false,
    setIsAuth: ()  => {},
    showMessage: false, 
    setShowMessage: () => {}, 
    messageType: 'error',
    setMessageType: () => {}, 
    message: 'Ocurrió un error! Vuelva a intentarlo.',
    setMessage: () => {},
    userName: '',
    setUserName: () => {}
  });