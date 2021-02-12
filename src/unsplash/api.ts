import { createApi } from "unsplash-js";
import keywords from "./keywords.json";

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || "",
});

export const findTagsAndPics = async (text: string) => {
  if (text === "") throw new Error("invalid text");
  const res = await unsplash.search.getPhotos({
    query: text,
    page: 1,
    perPage: 30,
  });
  const pics = res.response?.results;

  const fetchedTags: string[] =
    res.response?.results
      .map((el: any) => el.tags)
      .flat()
      .map((el) => el.title) || [];

  const grouppedTags: [string, number][] = fetchedTags.map((x) => [
    x,
    fetchedTags.filter((y: string) => y === x).length,
  ]);

  const cleanedTags = Array.from(new Map(grouppedTags))
    .sort((a, b) => b[1] - a[1])
    .map((tag) => tag[0]);

  return { pics: pics, tags: cleanedTags };
};

export const findAutocomplete = async (text: string) => {
  // nie mialem pomyslu jak moglbym zintegrowac unsplashowe api z autouzupelnieniem
  // zdjecia nie maja tytulow, a ich opisy czesto nie mialy duzo wspolnego z haslem
  // metody collections, topics, stats tez nie dawaly sensownych rezultatow

  // inne opcje: slownik z wyrazami
  // import { words } from "./wordList";
  // words.wordlist.filter((word: string) => word.includes(text)).slice(0, 5);
  // words.wordlist.filter((word: string) => word.startsWith(text)).slice(0, 5);

  // api google maps z miejscami
  // tego nie implementuje bo nie wydaje mi sie zeby w tym konkretnym przypadku mialo sens, bo jak mamy wyszukac haslo jak np "cat"

  // finalnie pobralem wersje lite bazy danych unsplasha
  // https://unsplash.com/data
  // wyciagnalem z niej keywordy i przerobilem na set po to aby sie nie powtarzaly i zrobilem z nich plik json z ktorego korzystam

  // zamiast startswith mozna tez uzyc metody .includes()

  const res: string[] = keywords
    .filter((el: string) => el.startsWith(text))
    .slice(0, 5);
  if (res.length > 0) return res;
  return ["NOT FOUND"];
};

export const findPhoto = async (id: string) => {
  const res = await unsplash.photos.get({ photoId: id });
  const photo = { ...res.response };

  return photo;
};
