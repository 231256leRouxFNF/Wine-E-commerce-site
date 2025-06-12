// components/Offerings.js
import React from "react";
import "./Offerings.css";
import PublicIcon from "@mui/icons-material/Public";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OfferingCard from "./OfferingCard";

const Offerings = () => {
  const offerings = [
    {
      icon: <PublicIcon className="muiIcon" />,
      title: "Global Selection",
      text: "Curated wines from South Africa to Spain, California to Chile.",
    },
    {
      icon: <ShoppingCartIcon className="muiIcon" />,
      title: "Buy Today",
      text: "No need to wait, purhase your favourites and enjoy overnight delivery.",
    },
    {
      icon: <FavoriteIcon className="muiIcon" />,
      title: "Add Your Favorites",
      text: "Contribute your top picks and help others discover their next go-to bottle.",
    },
  ];

  return (
    <section className="offeringsSection">
      <div className="offeringsHeader">
        <h4>FEATURES</h4>
        <h2>A Cellar Full of Possibilities</h2>
      </div>
      <div className="cardContainer">
        {offerings.map((item, index) => (
          <OfferingCard
            key={index}
            icon={item.icon}
            title={item.title}
            text={item.text}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Offerings;
