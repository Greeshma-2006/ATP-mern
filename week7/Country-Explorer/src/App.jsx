import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";

function App() {

  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {

    const fetchCountries = async () => {
      try {

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags"
        );

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();

        setCountries(data);
        setFiltered(data);
      } 
      catch  {
        setErr("Failed to load countries");
      } 
      finally {
        setLoading(false);
      }
    };

    fetchCountries();

  }, []);

  const handleSearch = (query) => {

    const result = countries.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered(result);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-2xl font-semibold mb-4">Country Explorer</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="mt-4">Loading countries...</p>}

      {err && <p className="text-red-500">{err}</p>}

      {!loading && !err && <CountryList countries={filtered} />}

    </div>
  );
}

export default App;