import fs from "fs";
function giveName(parsedName: string) {}
export function parseFileName(file: string) {
  // for each file, verify if it is a picture, and if it is, add it to the array of pictures

  if (
    file.endsWith(".jpg") ||
    file.endsWith(".png") ||
    file.endsWith(".jpeg")
  ) {
    if (file.length > 10) {
      return giveName(file.substring(0, 10).split(".")[0].toLowerCase());
    }
    return giveName(file.split(".")[0]);
  } else {
    return null;
  }
}
