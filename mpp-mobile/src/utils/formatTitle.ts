export function truncateTitle(title: string, maxLength = 35) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  } else {
    return title;
  }
}
