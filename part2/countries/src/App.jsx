import { useEffect, useState } from "react";
import axios from "axios";

function Country({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {    
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
    const lat = country.capitalInfo.latlng[0];
    const lon = country.capitalInfo.latlng[1];
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`).then((res) => {      
      setWeather(res.data);
    })
  }, [country]);

  if (!country) return;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital.join(", ")}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={country.languages[language]}>
            {country.languages[language]}
          </li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name} />

      {weather && <>
        <h2>Weather in {weather.name}</h2>
        <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
        <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} alt="" />
        <p>Wind: {weather.wind.speed} m/s</p>
      </>}
    </div>
  );
}

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then((res) => {
      setCountries(res.data);
    });
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase()),
    );
    setFiltered(filtered);
  }, [input, countries]);

  return (
    <>
      <div>
        find countries{" "}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {input &&
        (filtered.length > 10 ? (
          <p>too many results</p>
        ) : filtered.length > 1 ? (
          filtered.map((country) => (
            <div key={country.name.common}>
              <p>{country.name.common} <button onClick={() => setInput(country.name.common)}>show</button></p>
            </div>
          ))
        ) : filtered.length === 1 ? (
          <Country country={filtered[0]} />
        ) : (
          <p>no results</p>
        ))}
    </>
  );
}

export default App;
