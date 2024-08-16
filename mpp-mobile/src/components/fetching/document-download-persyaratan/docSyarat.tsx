import React from "react";

export default async function DocSyarat(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/layananfile/get/${id}`,
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
