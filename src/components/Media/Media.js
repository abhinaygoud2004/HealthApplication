import React from "react";
import "./Media.css";
import Tilt from "react-vanilla-tilt";
import Iframe from "react-iframe";
const   Media = () => {
  return (
    <div>
    <h1 className="header-text">Know more about your Health</h1>
    <div className="container">
      <Tilt className="card" options={{ speed: 400, max: 25 }}>
        <div className="content">
          <Iframe
            width="auto"
            height="200"
            src="https://www.youtube.com/embed/xyQY8a-ng6g"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
          <div className="topic text-lg font-semibold">How the food you eat affects your brain - Mia Nacamulli</div>
          <div className="description">
          When it comes to what you bite, chew and swallow, your choices have a direct and long-lasting effect on the most powerful organ in your body: your brain. So which foods cause you to feel so tired after lunch? Or so restless at night?
          </div>
          <a
            href="https://www.youtube.com/embed/xyQY8a-ng6g"
            className="text-sm underline underline-offset-2"
          >
            Know More
          </a>
        </div>
      </Tilt>
      <Tilt className="card" options={{ speed: 400, max: 25 }}>
        <div className="content p-2">
          <Iframe
            width="auto"
            height="200"
            src="https://www.youtube.com/embed/wxzc_2c6GMg"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
          <div className="topic text-lg font-semibold">How do carbohydrates impact your health? - Richard J. Wood</div>
          <div className="description">
          The things we eat and drink on a daily basis can impact our health in big ways. Too many carbohydrates, for instance, can lead to insulin resistance, which is a major contributor to cardiovascular disease and Type 2 Diabetes
          </div>
          <a
            href="https://www.youtube.com/embed/wxzc_2c6GMg"
            className="text-sm underline underline-offset-2 p-9" 
          >
            Know More
          </a>
        </div>
      </Tilt>
      <Tilt className="card" options={{ speed: 400, max: 25 }}>
        <div className="content p-2">
          <Iframe
            width="auto"
            height="200"
            src="https://www.youtube.com/embed/VEQaH4LruUo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
          <div className="topic text-lg font-semibold">What is a calorie? - Emma Bryce</div>
          <div className="description">
          We hear about calories all the time: How many calories are in this cookie? How many are burned by doing 100 jumping jacks, or long-distance running, or fidgeting? But what is a calorie, really? Emma Bryce explains how a few different factors should go into determining the recommended amount for each person.
          </div>
          <a
            href="https://www.youtube.com/embed/VEQaH4LruUo"
            className="text-sm underline underline-offset-2"
          >
            Know More
          </a>
        </div>
      </Tilt>
    </div>
    </div>
  );
};

export default Media;