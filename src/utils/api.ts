const API_URL = "https://restcountries.com/v3.1/all";

export const fetchCountries = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  return response.json();
};
