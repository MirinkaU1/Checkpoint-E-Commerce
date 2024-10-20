import React from "react";
import "../../App.css";
import Navbar from "../Navbar";

const Banner = () => {
  return (
    <section className="banner-section relative flex flex-col w-full h-dvh justify-center">
      <Navbar />
      <div className="mx-20 flex flex-col lg:flex-row items-center">
        <div className="text-center lg:text-left lg:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold text-bleu">
            Find Your <span className="text-orange">Perfect iPhone -</span>
            <br />
            Unbeatable deals await.
          </h1>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <img
            src="/img/iPhone16Pro.png"
            alt="iPhone"
            className="w-[50rem] lg:mt-24 rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
