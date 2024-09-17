"use client";

// import { useOthers, useSelf } from "@/liveblocks.config";
// import { UserAvatar } from "./userAvatar";
// import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_OTHER_USERS = 2;

export const Participants = () => {
//   const otherUsers = useOthers();
//   const currentUser = useSelf();
//   const hasMoreUsers = otherUsers.length > MAX_SHOWN_OTHER_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
        current user
    </div>
  )  
};

export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
}