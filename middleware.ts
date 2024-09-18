import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//Adding "(.*)"" after the route will make everything within that route not public. However, this is not always the case.
// const isProtectedRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, req) => {
  const isProtectedRoute = createRouteMatcher(["/home(.*)","/content(.*)", "/podcast(.*)", "/sketch(.*)", "/history(.*)", "/whiteboard(.*)", "/setting(.*)"]);

  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

// /setting(.*)", "/cv(.*)", "/history(.*)", "/content(.*)