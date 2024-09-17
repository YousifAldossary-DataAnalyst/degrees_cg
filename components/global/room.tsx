"use client";

import { Layer } from "@/types/canvas";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import {
    RoomProvider,
    ClientSideSuspense,
    LiveblocksProvider,
  } from "@liveblocks/react/suspense";
import React from "react";

interface RoomProps {
  children: React.ReactNode;
  roomId: string;
  fallback: NonNullable<React.ReactNode> | null;
  // id: string[]
}

export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <LiveblocksProvider publicApiKey={"pk_prod_krZCtB5YHV9NV5LYI1fdbCZuqOSxCnCk1k2v-AEPeoJqEetbW3yZxCZge5Q9-XAO"}>
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        pencilColor: null,
      }}
    //   // new LiveList<string>([]), the array is temporarily
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList<string>([]),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
    </LiveblocksProvider>
  );
};