import { useState, useEffect } from "react";
import { fetchCountries } from "../utils/api";
import { Country } from "../types/country";

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  // Adjusting error state to be of type string | null for simplicity
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        // Ensure your API utility function is adjusted to match the expected return type
        setCountries(data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message); // Casting the error as an Error object
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  return { countries, loading, error };
};

export default useCountries;
