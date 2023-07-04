export function trimProperties(obj: any): any {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    }
  });
  return obj;
}
