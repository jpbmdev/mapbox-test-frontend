import React, { createContext, useContext } from "react";
import { useSocket, socketContext } from "../hooks/useSocket";

const SocketContext = createContext<socketContext | undefined>(undefined);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC = ({ children }) => {
  const { socket, online } = useSocket("http://localhost:8080");
  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
