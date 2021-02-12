import React, { useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";
import { setSearch } from "../redux/actions/search";
import { useDispatch } from "react-redux";
import { ReactComponent as Search } from "../images/search.svg";
import { ReactComponent as Close } from "../images/close.svg";
import { useHistory, useLocation } from "react-router-dom";

export default function SearchBox() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (searchText.length >= 3) setShowAutocomplete(true);
    else setShowAutocomplete(false);
  }, [searchText]);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      dispatch(setSearch(searchText));
      history.push(`/search/${searchText}`);
    } else if (e.keyCode === 13) {
      e.currentTarget.blur();
      dispatch(setSearch(searchText));
      history.push(`/search/${searchText}`);
    }
  };

  const handleSearch = () => {
    dispatch(setSearch(searchText));
    history.push(`/search/${searchText}`);
  };

  useEffect(() => {
    const name = location.pathname.split("/").pop();
    if (name && name !== "/") setSearchText(name);
  }, [location.pathname]);

  useEffect(() => {
    const focus = (e: MouseEvent) => {
      const acceptable = [
        "searchBoxInput",
        "searchBoxAutocomplete",
        "searchBoxAutocompleteElement",
        "searchBoxText",
      ];
      const target = e.target as Element;
      if (!acceptable.includes(target.classList[0])) setHasFocus(false);
    };
    window.addEventListener("mousedown", focus);

    return () => window.removeEventListener("mousedown", focus);
  });

  return (
    <div className={location.pathname === "/" ? "searchBox" : "searchBoxGray"}>
      <Search className="searchBoxIcon" onClick={handleSearch} />
      {searchText && (
        <Close className="searchBoxClose" onClick={() => setSearchText("")} />
      )}

      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="searchBoxInput"
        placeholder="Search free high-resolution photos"
        onKeyDown={handleSubmit}
        title="Search photos"
        onFocus={() => setHasFocus(true)}
      />
      {showAutocomplete && hasFocus && (
        <Autocomplete text={searchText} setHasFocus={setHasFocus} />
      )}
    </div>
  );
}
