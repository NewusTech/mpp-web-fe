export function getDescription(value: number): string {
  if (value <= 0) {
    return "Belum Dinilai";
  } else if (value > 0 && value <= 30) {
    return "Sangat Buruk";
  } else if (value > 30 && value <= 50) {
    return "Buruk";
  } else if (value > 50 && value <= 75) {
    return "Cukup";
  } else if (value > 75 && value <= 90) {
    return "Baik";
  } else if (value > 90 && value <= 100) {
    return "Sangat Baik";
  }
  return "Nilai tidak valid";
}

export function getBackgroundClass(description: string): string {
  switch (description) {
    case "Sangat Buruk":
      return "bg-error-700";
    case "Buruk":
      return "bg-error-500";
    case "Cukup":
      return "bg-warning-700";
    case "Baik":
      return "bg-primary-700";
    case "Sangat Baik":
      return "bg-success-700";
    case "Belum Dinilai":
      return "bg-neutral-700";
    default:
      return "";
  }
}
