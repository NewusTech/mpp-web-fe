import React from "react";

export default async function fetchLayananList() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/layanan/get`,
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
