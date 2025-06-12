import React, { useEffect, useState } from "react";
import "./ImageLoader.css";

import Wine1 from "../assets/WineBottleAuth1.svg";
import Wine2 from "../assets/WineBottleAuth2.svg";
import Wine3 from "../assets/WineBottleAuth3.svg";
import Wine4 from "../assets/WineBottleAuth4.svg";
import Wine5 from "../assets/WineBottleAuth5.svg";
import Wine6 from "../assets/WineBottleAuth6.svg";

const images = [Wine1, Wine2, Wine3, Wine4, Wine5, Wine6];

const ImageLoader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="imageLoaderWrapper">
      <img
        src={images[index]}
        alt="Loading wine bottle"
        className="loaderImage"
      />
    </div>
  );
};

export default ImageLoader;
