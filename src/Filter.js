import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FilterApp() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((countryItem) =>
        countryItem.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <div className="App">
      <h1>Countries Lists</h1>
      <input
        type="text"
        placeholder="Search Countries"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredCountries.map((country, index) => (
        <CountryDetail key={index} {...country} />
      ))}
    </div>
  );
}

const CountryDetail = (props) => {
  const { name, flag, alpha3Code } = props;

  return (
    <>
      <p>
        <img src={flag} alt={name} style={{ width: "60px", height: "40px" }} />
      </p>
      <p>{name} ({alpha3Code}) </p>
    </>
  );
};
