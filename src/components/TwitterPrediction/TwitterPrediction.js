import React, { useState } from "react";
import "./TwitterPrediction.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import PredictionBox from "../PredictionBox/PredictionBox";
import Loader from "../Loader/Loader";

const TwitterPrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweets, setTweets] = useState(null);
  const [profileURL, setProfileURL] = useState("");
  const [tweetCount, setTweetCount] = useState(1);

  const fetchTweets = (e) => {
    e.preventDefault();
    setTweets(null);
    setIsLoading(true);
    if (profileURL) {
      console.log(typeof tweetCount);
      const data = {
        profile_url: profileURL,
        tweet_count: parseInt(tweetCount),
      };
      axios
        .post("http://127.0.0.1:8000/api/fetch-tweets/", data)
        .then((res) => {
          console.log(res.data);
          setTweets(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="twitter-prediction-main">
      <h2>Tweet Predictor</h2>
      <div className="twitter-url-input">
        <form onSubmit={fetchTweets}>
          <TextField
            id="outlined-basic"
            label="Twitter URL"
            variant="outlined"
            fullWidth
            onChange={(e) => setProfileURL(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Tweet Count"
            variant="outlined"
            type="number"
            onChange={(e) => setTweetCount(e.target.value)}
          />
          <button type="submit">Fetch Tweets</button>
        </form>
        {isLoading && <Loader />}
        <div className="tweets-container">
          {tweets && (
            <h2 style={{ textAlign: "center", width: "100%" }}>
              Fetched Tweets
            </h2>
          )}
          {tweets?.map((tweet, index) => {
            return <PredictionBox tweet={tweet} key={index} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TwitterPrediction;
