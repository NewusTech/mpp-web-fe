export default async function statistikFetch(
  limit = 1000000,
  month: string,
  year: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/statistik?limit=${limit}&month=${month}&year=${year}`,
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
