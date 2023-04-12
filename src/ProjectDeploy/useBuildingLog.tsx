import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Config from "src/@config";

function useBuildingLog(projectName: string, callback: (data: string) => void) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIO = io(`${Config.SERVER_URL}`);

    setSocket(socketIO);

    return () => {
      socketIO.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null) {
      return;
    }

    socket.on("connect", () => {
      console.info(
        `Socket for building log is connected - ${socket.id}`,
        socket.connected,
      );
    });

    socket.on("disconnect", () => {
      console.info(
        `Socket for building log is disconnected - ${socket.id}`,
        socket.connected,
      );
    });

    socket.emit("get-building-log", projectName);

    socket.on("new-building-log", callback);

    return () => {
      socket.off("new-building-log");
    };
  }, [projectName, socket]);
}

export default useBuildingLog;
