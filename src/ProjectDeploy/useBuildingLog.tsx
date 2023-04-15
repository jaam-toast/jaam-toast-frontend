import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Config from "../@config";

const WELCOME_MESSAGE = [
  "\u00A0\u00A0\u00A0__\u00A0\u00A0\u00A0\u00A0\u00A0______\u00A0\u00A0\u00A0\u00A0\u00A0______\u00A0\u00A0\u00A0\u00A0\u00A0__\u00A0\u00A0\u00A0\u00A0__\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0______\u00A0\u00A0\u00A0______\u00A0\u00A0\u00A0\u00A0\u00A0______\u00A0\u00A0\u00A0\u00A0\u00A0______\u00A0\u00A0\u00A0\u00A0\u00A0______\u00A0\u00A0",
  "\u00A0\u00A0/\\ \\ \u00A0\u00A0/\\ \u00A0__ \\ \u00A0\u00A0/\\ \u00A0__ \\ \u00A0\u00A0/\\ \\-./ \u00A0\\ \u00A0\u00A0\u00A0\u00A0\u00A0/\\__ \u00A0_\\ /\\ \u00A0__ \\ \u00A0\u00A0/\\ \u00A0__ \\ \u00A0\u00A0/\\ \u00A0___\\ \u00A0\u00A0/\\__ \u00A0_\\ ",
  " _\\_\\ \\  \\ \\ \u00A0__ \\ \u00A0\\ \\ \u00A0__ \\ \u00A0\\ \\ \\-./\\ \\ \u00A0\u00A0\u00A0\u00A0\\/_/\\ \\/ \\ \\ \\/\\ \\ \u00A0\\ \\ \u00A0__ \\ \u00A0\\ \\___ \u00A0\\ \u00A0\\/_/\\ \\/ ",
  "/\\_____\\ \u00A0\\ \\_\\ \\_\\ \u00A0\\ \\_\\ \\_\\ \u00A0\\ \\_\\ \\ \\_\\ \u00A0\u00A0\u00A0\u00A0\u00A0 \\ \\_\\ \u00A0\\ \\_____\\ \u00A0\\ \\_\\ \\_\\  \\/\\_____\\ \u00A0 \u00A0\\ \\_\\ ",
  "\\/_____/ \u00A0 \\/_/\\/_/ \u00A0 \\/_/\\/_/ \u00A0 \\/_/ \u00A0\\/_/ \u00A0 \u00A0 \u00A0 \u00A0\\/_/ \u00A0 \\/_____/ \u00A0 \\/_/\\/_/ \u00A0 \\/_____/ \u00A0 \u00A0 \\/_/ ",
  "\n",
  "\n",
  "welocome to jaam-toast!",
  "@Every deployment from the 2023 edition of Jaam Toast.",
  "\n",
];

export function useBuildingLog({
  projectName,
  onLog,
  onComplete,
  onError,
}: {
  projectName: string;
  onLog: (log: string) => void;
  onComplete: () => void;
  onError: () => void;
}) {
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

      WELCOME_MESSAGE.forEach(onLog);
    });

    socket.on("disconnect", () => {
      console.info(
        `Socket for building log is disconnected - ${socket.id}`,
        socket.connected,
      );
    });

    socket.emit("get-building-log", projectName);

    socket.on("new-building-log", onLog);

    socket.on("build-complete", onComplete);

    socket.on("build-error", onError);

    return () => {
      socket.off("new-building-log");
    };
  }, [projectName, socket]);
}
