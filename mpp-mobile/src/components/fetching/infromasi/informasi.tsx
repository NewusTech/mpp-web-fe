export default async function fetchInformasi() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/dashboard/webuser`,
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
