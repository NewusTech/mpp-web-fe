"use server";

import Cookies from "js-cookie";

export default async function AntrianCheck(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/antrian/check/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("Authorization")}`,
      },
      cache: "no-store",
    }
  );

  return response.json();
}
