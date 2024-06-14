import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/profile",
  "/riwayat",
  "/statistik",
  "/survey",
  "/layanan/booking-antrian",
  "/layanan/permohonan-layanan",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("Authorization")?.value;
  console.log(token, "ini token");

  const requestedUrl = request.nextUrl.pathname;

  const requiresAuthentication = protectedRoutes.some((route) =>
    requestedUrl.startsWith(route)
  );

  if (requiresAuthentication && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", requestedUrl);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/riwayat/:path*",
    "/statistik/:path*",
    "/survey/:path*",
    "/layanan/booking-antrian/:path*",
    "/layanan/permohonan-layanan/:path*",
  ],
};
