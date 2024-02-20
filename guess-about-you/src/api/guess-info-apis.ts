import axios from "axios";

const AgifyUrl = "https://api.agify.io";
const GenderizeUrl = "https://api.genderize.io";
const NationalizeUrl = "https://api.nationalize.io";

const apiCall = async (URL: string) => {
  const options = {
    method: "GET",
    url: URL,
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (err) {
    console.log("err =>", err);
    return null;
  }
};

// Agify API
export const fetchAge = (name: string) => {
  const url = `${AgifyUrl}?name=${name}`;
  return apiCall(url);
};

// Genderize API
export const fetchGender = (name: string) => {
  const url = `${GenderizeUrl}?name=${name}`;
  return apiCall(url);
};

// Nationalize API
export const fetchNationality = (name: string) => {
  const url = `${NationalizeUrl}?name=${name}`;
  return apiCall(url);
};
