export default async function facilitiesFetch() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/Facilities/get`,
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
