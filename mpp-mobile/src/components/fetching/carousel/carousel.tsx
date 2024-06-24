export default async function fetchCarousel() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/carousel/get`,
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
