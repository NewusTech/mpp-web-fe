import React from "react";

export default async function fetchAlurPermohonan() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/alurpermohonan/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return response.json();
}