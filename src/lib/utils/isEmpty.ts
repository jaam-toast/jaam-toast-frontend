function isEmpty(obj: any): boolean {
  if (Array.isArray(obj)) {
    return !obj.length;
  } else {
    return !Object.keys(obj).length;
  }
}

export default isEmpty;
