export default function wrapText(str: string, maxLength: number = 10) {
  let result = "";
  let line = "";

  for (let i = 0; i < str.length; i++) {
    line += str[i];
    if (line.length === maxLength) {
      result += line + "\n";
      line = "";
    }
  }

  if (line.length > 0) {
    result += line;
  }

  return result;
}
