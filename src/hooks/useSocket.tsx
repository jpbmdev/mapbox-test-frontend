import { useMemo, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export interface socketContext {
  socket: Socket;
  online: boolean;
}

export const useSocket = (serverPath: string) => {
  const socket = useMemo(
    () =>
      io(serverPath, {
        transports: ["websocket"],
      }),
    [serverPath]
  );

  const [online, setOnline] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};
