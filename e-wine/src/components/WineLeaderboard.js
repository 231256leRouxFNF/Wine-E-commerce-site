import React from "react";
import "./WineLeaderboard.css";
import Wine1 from "../assets/wine1designed.svg";
import Wine2 from "../assets/wine2designed.svg";
import Wine3 from "../assets/wine3designed.svg";

const WineLeaderboard = () => {
  return (
    <div className="wineOfTheMonth">
      <div className="overlapWrapper">
        <div className="overlap">
          {/* Headings */}
          <div className="headingWrapper">
            <div className="topPick">Pour Decisions</div>
            <div className="beginHere">begin here</div>
          </div>

          {/* Wine 1 */}
          <div className="wineInfo1">
            <p className="description">
              Château Margaux is a legendary Bordeaux estate producing elegant,
              age-worthy wines. Its Grand Vin, Pavillon Rouge, and Pavillon
              Blanc are globally renowned. Established in the 16th century, it
              remains a symbol of excellence.
            </p>
            <div className="group">
              <div className="overlapGroup">
                <div className="country">France</div>
                <div className="wineName">Château Margaux</div>
              </div>
              <div className="rating">4.7</div>
            </div>
          </div>

          {/* Wine 2 */}
          <div className="wineInfo2">
            <p className="description">
              Sassicaia is the iconic Super Tuscan from Tenuta San Guido in
              Bolgheri, Italy. Known for its Bordeaux-style blend of Cabernet
              Sauvignon and Cabernet Franc, it brought global acclaim to Italian
              fine wine and redefined modern winemaking in Tuscany.
            </p>
            <div className="group">
              <div className="overlapGroup">
                <div className="country">Italy</div>
                <div className="wineName">Sassicaia</div>
              </div>
              <div className="rating">4.6</div>
            </div>
          </div>

          {/* Wine 3 */}
          <div className="wineInfo3">
            <p className="description">
              Kanonkop Estate is a South African wine icon, famous for its
              world-class Pinotage. Bold, smoky, and rich in character, this
              wine showcases the potential of South Africa’s signature grape.
              Generations of winemakers have helped build its international
              prestige.
            </p>
            <div className="group2">
              <div className="overlapGroup2">
                <div className="country">South Africa</div>
                <div className="wineNameAlt">Kanonkop Pinotage</div>
              </div>
              <div className="rating">4.5</div>
            </div>
          </div>

          {/* Images */}
          <img className="wineImg1" src={Wine1} alt="Château Margaux" />
          <img className="wineImg2" src={Wine2} alt="Sassicaia" />
          <img className="wineImg3" src={Wine3} alt="Kanonkop Pinotage" />
        </div>
      </div>
    </div>
  );
};

export default WineLeaderboard;
