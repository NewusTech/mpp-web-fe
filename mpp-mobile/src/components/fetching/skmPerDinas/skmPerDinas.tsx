import React from "react";

export default async function SKMPerDinasFetch(instansi_id?: number) {
  if (!instansi_id) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/statskm/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    return response.json();
  } else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/statskm/user?instansi_id=${instansi_id}`,
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
}
