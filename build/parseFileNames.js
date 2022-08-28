export function parseFileName(file) {
    // for each file, verify if it is a picture, and if it is, add it to the array of pictures
    if (file.endsWith(".jpg") || file.endsWith(".png")) {
        return file.split(".")[0];
    }
    else {
        return null;
    }
}
//# sourceMappingURL=parseFileNames.js.map