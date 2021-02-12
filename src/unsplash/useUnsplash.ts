import { useState, useEffect } from "react";
import { findTagsAndPics, findAutocomplete, findPhoto } from "./api";

const useTagsAndPics = (text: string) => {
  const [tags, setTags] = useState<string[]>([]);
  const [pics, setPics] = useState<any[]>([]);
  useEffect(() => {
    findTagsAndPics(text)
      .then((res: any) => {
        setTags(res.tags);
        setPics(res.pics);
      })
      .catch((error) => {});
  }, [text]);

  return { pics, tags };
};

const useAutocomplete = (text: string) => {
  const [res, setRes] = useState<string[]>([]);
  useEffect(() => {
    findAutocomplete(text).then((res) => {
      setRes(res);
    });
  }, [text]);

  return { res };
};

const usePhoto = (id: string) => {
  const [res, setRes] = useState<any>(null);
  useEffect(() => {
    if (id)
      findPhoto(id).then((res: any) => {
        setRes(res);
      });
    else setRes(null);
  }, [id]);
  return { pic: res };
};

export { useTagsAndPics, useAutocomplete, usePhoto };
