import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function Tags({ tags }: { tags: string[] }) {
  const tagsDiv = useRef<HTMLDivElement>(null);

  return (
    <div className="tags" ref={tagsDiv}>
      {tags.map((tag) => (
        <Link to={`/tags/${tag}`} key={`tags${tag}`}>
          <div className="tag">{tag}</div>
        </Link>
      ))}
      {tags.length * 205 > window.innerWidth * 0.9 && (
        <div className="fadeoutDiv" />
      )}
    </div>
  );
}
