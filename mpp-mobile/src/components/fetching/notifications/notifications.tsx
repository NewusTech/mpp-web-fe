export default async function fetchNotifications() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/notifications`,
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
