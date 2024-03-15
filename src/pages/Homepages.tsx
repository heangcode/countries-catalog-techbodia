import React, { useState } from "react";
import { CountriesList, Input, Modal } from "../components";
import useCountries from "../hooks/useCountries";
import { Country } from "../types/country";
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { Menu } from "@headlessui/react";

const HomePage: React.FC = () => {
  const { countries, loading, error } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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

  const sortedCountries = filteredCountries.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.official.localeCompare(b.name.official);
    } else {
      return b.name.official.localeCompare(a.name.official);
    }
  });

  const handlePrevPage = () => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((current) =>
      Math.min(current + 1, Math.ceil(sortedCountries.length / itemsPerPage))
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-10">
      <div className="flex items-center space-x-4">
        <Input
          className="w-[300px]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by country name..."
        />
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Sort {sortOrder === "asc" ? " Ascending" : "Descending"}
            <HiOutlineChevronDown
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
          <Menu.Items className="absolute right-0 z-30 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setSortOrder("asc")}
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Ascending
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setSortOrder("desc")}
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Descending
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
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
            </ul>
          </div>
        </Modal>
      )}
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
