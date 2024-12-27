import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: Request) {
  console.log("Middleware ejecutado", request.url); // Verifica que el middleware está siendo ejecutado

  const userId = cookies().get("userId");

  if (userId && request.nextUrl.pathname === "/login") {
    console.log("Redirigiendo a /home");
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
