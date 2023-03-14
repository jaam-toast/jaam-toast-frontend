export default function getFormattedKoreaTime(date: Date) {
  const koreaOffset = date.getTimezoneOffset() * 60000;
  const offsetDateApplied = new Date(date.getTime() - koreaOffset);

  const dateISOString = offsetDateApplied.toISOString();
  const formattedKoreaTime = `${dateISOString.split("T")[0]} ${
    dateISOString.split("T")[1].split(".")[0]
  }`;

  return formattedKoreaTime;
}
