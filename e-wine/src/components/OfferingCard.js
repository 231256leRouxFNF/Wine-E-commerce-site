// components/OfferingCard.js
import React from "react";
import useInView from "../hooks/useInView";

const OfferingCard = ({ icon, title, text, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`offeringCard ${inView ? "fadeIn" : ""}`}
      style={{ "--delay": `${index * 0.2}s` }}
    >
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default OfferingCard;
