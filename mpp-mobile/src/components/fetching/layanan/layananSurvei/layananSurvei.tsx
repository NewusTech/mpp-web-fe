"use server";

import Cookies from "js-cookie";

export default async function LayananSurvei(id: number, skm?: boolean) {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/layanan/dinas/get/${id}?skm=${skm}`,
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
