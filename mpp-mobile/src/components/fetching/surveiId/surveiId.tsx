import Cookies from "js-cookie";

export default async function FetchSurveiId(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/inputsurvey/detail/${id}`,
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
