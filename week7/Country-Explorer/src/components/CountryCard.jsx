import React from "react";

function CountryCard({ country }) {

  return (
    <div className="border rounded p-3 shadow-sm">

      <img
        src={country.flags.png}
        alt={country.name.common}
        className="w-full h-24 object-cover mb-2"
      />

      <h3 className="font-semibold">{country.name.common}</h3>

      <p className="text-sm">
        Capital: {country.capital ? country.capital[0] : "N/A"}
      </p>

      <p className="text-sm">
        Population: {country.population.toLocaleString()}
      </p>

      <p className="text-sm">
        Region: {country.region}
      </p>

    </div>
  );
}

export default CountryCard;