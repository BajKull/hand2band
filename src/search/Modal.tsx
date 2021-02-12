import React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { ReactComponent as Heart } from "../images/heart.svg";
import { ReactComponent as Plus } from "../images/plus.svg";
import { ReactComponent as Location } from "../images/location.svg";
import { ReactComponent as Share } from "../images/share.svg";
import { ReactComponent as Info } from "../images/info.svg";
import { usePhoto } from "../unsplash/useUnsplash";
import { setModalPhoto } from "../redux/actions/modalPhoto";

export default function Modal() {
  const dispatch = useDispatch();
  const picId = useSelector((state: RootStateOrAny) => state.modal);

  const { pic } = usePhoto(picId);

  const handleClose = () => {
    dispatch(setModalPhoto(""));
  };

  if (pic)
    return (
      <div className="modal">
        <div className="modalBackground" onClick={handleClose}></div>
        <div className="modalContent">
          <div className="topBar">
            <div className="author">
              <img src={pic.user.profile_image.small} alt="profile" />
              <div>
                <p className="authorName">{pic.user.name}</p>
                <p className="authorUsername">@{pic.user.username}</p>
              </div>
            </div>
            <div className="likes">
              <Heart className="modalIcon" />
              <Plus className="modalIcon" />
            </div>
          </div>
          <img
            src={pic.urls.regular}
            alt={pic.alt_description}
            className="modalImage"
          />
          <div className="bottomBar">
            <div className="location">
              <Location className="modalIcon" />
              <p className="locationName">{pic.location.name || "unknown"}</p>
            </div>
            <div className="share">
              <button className="shareButton">
                <Share className="modalIcon" /> share
              </button>
              <button className="shareButton">
                <Info className="modalIcon" /> info
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  else return null;
}
