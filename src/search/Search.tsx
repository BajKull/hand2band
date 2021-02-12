import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Tags from "./Tags";
import { Helmet } from "react-helmet";
import { useTagsAndPics } from "../unsplash/useUnsplash";
import { setSearch } from "../redux/actions/search";
import Modal from "./Modal";
import Pics from "./Pics";
import SearchText from "./SearchText";

export default function Search() {
  const location = useLocation();
  const dispatch = useDispatch();
  const search = useSelector((state: RootStateOrAny) => state.search);
  const { tags, pics } = useTagsAndPics(search);

  useEffect(() => {
    if (search === "") {
      const l = location.pathname.split("/").pop();
      if (l) dispatch(setSearch(l));
    }
  }, [dispatch, location.pathname, search]);

  return (
    <div className="search">
      <Helmet>
        <title>Hand2HandTest | {search}</title>
        <meta
          name="description"
          content={pics.map((pic) => pic.description).join(" ")}
        />
      </Helmet>
      <SearchBox />
      <SearchText />
      <Tags tags={tags} />
      <Pics pics={pics} />
      <Modal />
    </div>
  );
}
