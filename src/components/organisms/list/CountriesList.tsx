import React from "react";
import { CountryCard } from "../../molecules";
import { Country } from "../../../types/country";

interface CountriesListProps {
  countries: Country[];
  onCountrySelect: (country: Country) => void;
}

const CountriesList: React.FC<CountriesListProps> = ({
  countries,
  onCountrySelect,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 p-4">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
          onClick={() => onCountrySelect(country)}
        />
      ))}
    </div>
  );
};

export { CountriesList };
