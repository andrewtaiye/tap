export const capitaliseFirstLetter = (string: string): string => {
  const words = string.split(/ |-/);
  const newWords: string[] = [];
  for (let word of words) {
    const arr: string[] = word.split("");
    arr[0] = arr[0].toUpperCase();
    newWords.push(arr.join(""));
  }
  return newWords.join(" ");
};
