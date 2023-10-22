import React, { useState } from "react";
import "./Home.css";
import TwitterPrediction from "../TwitterPrediction/TwitterPrediction";
import Tab from "../Tab/Tab";

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const labels = [
    "Tweet Predictor",
    "FB Post Predictor",
    "User Input Predictor",
  ];

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  return (
    <div className="home-main">
      <div className="tabs-container">
        {labels.map((label, index) => (
          <Tab
            key={index}
            label={label}
            isActive={activeTab === index}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </div>
      <div>
        {activeTab === 0 && (
          <div className="tab-content">
            <TwitterPrediction />
          </div>
        )}
        {activeTab === 1 && (
          <div className="tab-content">Content for Tab 2</div>
        )}
        {activeTab === 2 && (
          <div className="tab-content">Content for Tab 3</div>
        )}
      </div>
    </div>
  );
};

export default Home;
