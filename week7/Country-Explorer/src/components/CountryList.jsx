import React from "react";
import CountryCard from "./CountryCard";

function CountryList({ countries }) {

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

      {countries.map((country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}

    </div>
  );
}

export default CountryList;