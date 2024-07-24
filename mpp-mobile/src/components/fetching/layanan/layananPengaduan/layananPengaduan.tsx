"use server";

import Cookies from "js-cookie";

export default async function LayananPengaduan(
  id: number,
  pengaduan?: boolean
) {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/layanan/dinas/get/${id}?pengaduan=${pengaduan}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  return response.json();
}
