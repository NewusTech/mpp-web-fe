export default async function fetchNews() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/artikel/get`,
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
