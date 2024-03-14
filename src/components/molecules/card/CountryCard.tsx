import React from "react";
import { Country } from "../../../types/country";

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  const nativeNameObject = Object.values(country.name.nativeName || {})[0];
  const nativeName = nativeNameObject?.official;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer h-[400px] rounded-[16px] overflow-hidden shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <img
        className="w-full h-40 object-cover"
        src={country.flags.png}
        alt={`${country.name.official} flag`}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{country.name.official}</div>
        <p className="text-gray-700 text-base">
          CCA2: {country.cca2} | CCA3: {country.cca3}
        </p>
        <p className="text-gray-700 text-base">
          Native Name: {nativeName || "N/A"}
        </p>
        <p className="text-gray-700 text-base line-clamp-2">
          Alternative Names: {country.altSpellings.join(", ")}
        </p>
        <p className="text-gray-700 text-base line-clamp-3">
          Calling Codes: {country.idd.root}
          {country.idd.suffixes?.join(", ") || ""}
        </p>
      </div>
    </div>
  );
};

export { CountryCard };
