export default function timeSince(milliseconds: number) {
  const seconds = Math.floor((new Date().valueOf() - milliseconds) / 1000);

  const yearsCount = seconds / (86400 * 365);
  const monthsCount = seconds / (86400 * 30.5);
  const daysCount = seconds / 86400;
  const hoursCount = seconds / 3600;
  const minsCount = seconds / 60;

  if (yearsCount > 1) {
    return `${Math.floor(yearsCount)} years`;
  }

  if (monthsCount > 1) {
    return `${Math.floor(monthsCount)} months`;
  }

  if (daysCount > 1) {
    return `${Math.floor(daysCount)} days`;
  }

  if (hoursCount > 1) {
    return `${Math.floor(hoursCount)} hours`;
  }

  if (minsCount > 1) {
    return `${Math.floor(minsCount)} mins`;
  }

  return `${Math.floor(seconds)} seconds`;
}
