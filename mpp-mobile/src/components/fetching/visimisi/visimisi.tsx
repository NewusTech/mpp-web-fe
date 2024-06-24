import React from "react";

export default async function fetchVisiMisi() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/visimisi/get`,
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
