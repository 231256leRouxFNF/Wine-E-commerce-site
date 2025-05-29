import React from "react";
import Hero from "../components/Hero";
import WineLeaderboard from "../components/WineLeaderboard";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Leaderboard Section */}
      <WineLeaderboard />

    </>
  );
};

export default Home;