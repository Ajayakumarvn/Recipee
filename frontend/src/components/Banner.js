import React from "react";

const Banner = (props) => {
  return (
    <div className="banner">
      <h1 className="banner-cap">{props.title}</h1>
    </div>
  );
};

export default Banner;
