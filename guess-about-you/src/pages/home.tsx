import React from "react";
import GuessInfo from "../components/guess-info";
import styles from "../app/page.module.css";

const HomePage = () => {
  return (
    <div>
      <h1 className={styles.heading}>Name Guessing App</h1>
      <GuessInfo />
    </div>
  );
};

export default HomePage;
