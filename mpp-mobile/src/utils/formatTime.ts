export function formatTime(timeString: string) {
  const [hours, minutes] = timeString.split(":");
  return `${hours}.${minutes}`;
}

export function formatCreateTime(isoString: string) {
  const date = new Date(isoString);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}.${formattedMinutes}`;
}
