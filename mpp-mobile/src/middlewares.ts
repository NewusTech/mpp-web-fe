import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";

export default async function middleware(request: NextRequest) {
  const protectedRoutes = ["/profile", "/riwayat", "/statistik", "/surver"];
  const token = Cookies.get("Authentication");

  const requestedUrl = request.nextUrl.pathname;

  const requiresAuthentication = protectedRoutes.includes(requestedUrl);

  if (requiresAuthentication && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
