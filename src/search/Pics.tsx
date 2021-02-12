import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModalPhoto } from "../redux/actions/modalPhoto";

export default function Pics({ pics }: { pics: any[] }) {
  const [loaded, setLoaded] = useState(0);
  const dispatch = useDispatch();
  const showModal = (id: string) => {
    dispatch(setModalPhoto(id));
  };

  useEffect(() => {
    if (pics.length !== 0) {
      if (loaded === pics.length) {
        Array.from(document.getElementsByClassName("hidden")).forEach((el) =>
          el.classList.remove("hidden")
        );
        setLoaded(0);
      }
    }
  }, [loaded, pics.length]);

  return (
    <div className="pics">
      {pics.map((pic) => (
        <div className="pic hidden" key={pic.id}>
          <img
            src={pic.urls.small}
            alt={pic.alt_description}
            onClick={() => showModal(pic.id)}
            onLoad={() => setLoaded(loaded + 1)}
            onError={() => console.log("tet")}
          />
          <div className="picTags">
            {pic.tags.map((tag: { title: string }) => (
              <p key={pic.id + tag.title} className="picTag">
                {tag.title}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
