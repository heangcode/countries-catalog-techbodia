import React, { useState } from "react";
import { CountriesList, Input, Modal } from "../components";
import useCountries from "../hooks/useCountries";
import { Country } from "../types/country";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

const HomePage: React.FC = () => {
  const { countries, loading, error } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Filter countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCountries = filteredCountries.length;
  const totalPages = Math.ceil(totalCountries / itemsPerPage);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  const handlePrevPage = () => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((current) => Math.min(current + 1, totalPages));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-10">
      <Input
        className="w-[300px]"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to first page when search term changes
        }}
        placeholder="Search by country name..."
      />
      <CountriesList
        countries={filteredCountries.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )}
        onCountrySelect={handleCountrySelect}
      />
      {selectedCountry && (
        <Modal onClose={() => setSelectedCountry(null)}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCountry.name.official}
            </h2>
            <img
              className="mx-auto h-24 w-auto"
              src={selectedCountry.flags.png}
              alt="Flag"
            />
            <ul className="list-disc space-y-2 pl-5 text-gray-700">
              <li>Country Name: {selectedCountry.name.official}</li>
              <li>2 character Country Code (CCA2): {selectedCountry.cca2}</li>
              <li>3 character Country Code (CCA3): {selectedCountry.cca3}</li>
              <li>
                Native Country Name:{" "}
                {Object.values(selectedCountry.name.nativeName)[0]?.official}
              </li>
              <li>
                Alternative Country Names:{" "}
                {selectedCountry.altSpellings.join(", ")}
              </li>
              <li>
                Country Calling Codes: {selectedCountry.idd.root}
                {selectedCountry.idd.suffixes.join(", ")}
              </li>
              {/* Add other details as required */}
            </ul>
          </div>
        </Modal>
      )}
      {/* New Pagination Controls */}
      <div className="flex items-center space-x-4 justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
            currentPage === 1 ? "opacity-0 cursor-default" : ""
          }`}
        >
          <HiOutlineChevronLeft className="h-5 w-5" aria-hidden="true" />
          Previous
        </button>
        <p className="text-sm text-gray-700">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
            currentPage === totalPages ? "opacity-0 cursor-default" : ""
          }`}
        >
          Next
          <HiOutlineChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
