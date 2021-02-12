import React from "react";
import { useAutocomplete } from "../unsplash/useUnsplash";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/actions/search";

export default function Autocomplete({
  text,
  setHasFocus,
}: {
  text: string;
  setHasFocus: Function;
}) {
  const dispatch = useDispatch();
  const { res } = useAutocomplete(text);

  const changeSearchText = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    val: string
  ) => {
    setHasFocus(false);
    dispatch(setSearch(val));
  };

  if (res.length === 0) return null;
  else if (res.length !== 0 && res[0] !== "NOT FOUND")
    return (
      <div className="searchBoxAutocomplete">
        {res.map((el) => (
          <Link
            to={`/search/${el}`}
            key={el}
            onClick={(e) => changeSearchText(e, el)}
          >
            <div className="searchBoxAutocompleteElement" key={el}>
              <p className="searchBoxText">{el}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  else
    return (
      <div className="searchBoxAutocomplete">
        <div className="searchBoxAutocompleteElement">
          <p>Couldn't find any results.</p>
        </div>
      </div>
    );
}
