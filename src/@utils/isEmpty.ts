function isEmpty(value: unknown): boolean {
  if (Array.isArray(value)) {
    return !value.length;
  }

  if (typeof value === "object") {
    if (!value) {
      return true;
    }

    for (const key in value) {
      if (Object.hasOwn(value, key)) {
        return false;
      }
    }

    return true;
  }

  return !value;
}

export default isEmpty;
