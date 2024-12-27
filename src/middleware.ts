import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: Request) {
  const userId = cookies().get("userId");
  const pathname = new URL(request.url).pathname;

  if (!userId && pathname === "/home") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (userId && pathname === "/login") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/login"],
};
