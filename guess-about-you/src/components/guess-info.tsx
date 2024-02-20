"use client";

import React, { useState } from "react";
import styles from "../app/page.module.css";
import {
  fetchAge,
  fetchGender,
  fetchNationality,
} from "../api/guess-info-apis";
import countryCodes from "../constants/country-codes";

const GuessInfo = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!name) {
      alert("Name is required.");
      return;
    }

    try {
      const agifyResponse = await fetchAge(name);
      const guessedAge = agifyResponse?.age || "Unknown";
      setAge(guessedAge);

      const genderizeResponse = await fetchGender(name);
      const guessedGender = genderizeResponse?.gender || "Unknown";
      setGender(guessedGender);

      const nationalizeResponse = await fetchNationality(name);

      const countries = nationalizeResponse?.country;
      if (countries && countries.length > 0) {
        const guessedCountries = codeToCountry(countries);
        setCountry(guessedCountries);
      } else {
        setCountry("Unknown");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.description}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            className={styles.button}
            // style={{ borderRadius: "10px", padding: 10, fontSize: 18 }}
          >
            Guess Info
          </button>
        </div>
      </form>
      {age && <p>Guessed Age: {age}</p>}
      {gender && <p>Guessed Gender: {gender}</p>}
      {country && <p>Guessed Country: {country}</p>}
    </>
  );
};

export default GuessInfo;

const codeToCountry = (data: any[]) => {
  const countriesArray = data.map((country: { country_id: string }) => {
    return countryCodes[country.country_id as keyof typeof countryCodes];
  });
  const countries = countriesArray.join(", ");
  return countries;
};

// Check the line, return countryCodes[country.country_id as keyof typeof countryCodes];
// Earlier it was like this - return countryCodes[country.country_id];
// The earlier line was throwing a TypeScript warning that says TypeScript doesn't know
// if country_id will always be a valid key for countryCodes.
// To fix the warning, I've put "as keyof typeof countryCodes" informing TypeScript that
// I'm sure the country_id will be a valid key in countryCodes.
