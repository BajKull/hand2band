import React from "react";
import { useLocation } from "react-router-dom";

export default function SearchText() {
  const location = useLocation();
  return <h1 className="searchText">{location.pathname.split("/").pop()}</h1>;
}
