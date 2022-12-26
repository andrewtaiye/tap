interface fetchOptions {
  method: string;
  body: string | null;
  headers: {
    "Content-Type": string;
    Authorization?: string;
  };
}

export const capitaliseFirstLetter = (string?: string): string => {
  if (!string || string === " ") return "";
  const words: string[] = string?.split(/ |-/);
  const newWords: string[] = [];
  for (let word of words) {
    const arr: string[] = word.split("");
    arr[0] = arr[0].toUpperCase();
    newWords.push(arr.join(""));
  }
  return newWords.join(" ");
};

export const fetchCall = async (
  url: string,
  header: string = "",
  method: string = "GET",
  body: any = null
) => {
  const options: fetchOptions = {
    method: method,
    body: body === null ? null : JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (header) {
    options.headers.Authorization = "Bearer " + header;
  }
  const res = await fetch(url, options);

  const response = await res.json();
  return response;
};
