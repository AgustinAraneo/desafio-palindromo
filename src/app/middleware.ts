import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: Request) {
  console.log("Middleware ejecutado", request.url);

  const userId = cookies().get("userId");

  const url = new URL(request.url);
  if (userId && url.pathname === "/login") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
