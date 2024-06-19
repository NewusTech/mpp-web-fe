export default async function fetchNews(page = 1, limit = 4) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/artikel/get?page=${page}&limit=${limit}`,
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
