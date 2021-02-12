import React from "react";
import { Helmet } from "react-helmet";
import SearchBox from "../components/SearchBox";
import bg from "./bg.jpg";

export default function Landing() {
  return (
    <div className="landing">
      <Helmet>
        <title>Hand2HandTest</title>
        <meta name="description" content="zadanie testowe" />
      </Helmet>
      <div className="content">
        <img src={bg} alt="background" className="landingBackground" />
        <span className="landingBackgroundCover" />
        <span className="landingName">Unsplash</span>
        <h1 className="landingTitle">
          The internet's source of{" "}
          <span className="landingTitleLink">freely-usable images.</span>
        </h1>
        <p className="landingSubtitle">Powered by creators everywhere.</p>
        <SearchBox />
        <p className="landingTrending">
          Trending: flower, wallpapers, backgrounds, happy, love
        </p>
      </div>
    </div>
  );
}
