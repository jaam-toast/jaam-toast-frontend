const numberAndAlphabetCharCodes = [
  // char codes from "1" ~ "9".
  49, 50, 51, 52, 53, 54, 55, 56, 57,
  // char codes from "A" ~ "Z".
  97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112,
  113, 114, 115, 116, 117, 118, 119, 120, 121, 122,
  // char codes from "a" ~ "z".
  65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
  84, 85, 86, 87, 88, 89, 90,
];

const getRandomIndex = () =>
  Math.floor(Math.random() * numberAndAlphabetCharCodes.length);

function createRandomId(length: number = 7): string {
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomIndex();
    const randomCharCode = numberAndAlphabetCharCodes[randomIndex];
    result += String.fromCharCode(randomCharCode);
  }

  return result;
}

export default createRandomId;