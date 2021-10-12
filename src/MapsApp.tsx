import React from "react";
import { SocketProvider } from "./context/socketContext";
import { MapaPage } from "./pages/MapaPage";

export const MapsApp: React.FC = () => {
  return (
    <SocketProvider>
      <MapaPage />;
    </SocketProvider>
  );
};
