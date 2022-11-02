import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [showFiltered, setShowFiltered]  = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);


  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      // console.log(typeof JSON.parse(response.data));
      setCountries(response.data);
    })
  }, []);

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setNewSearch(e.target.value.toLowerCase());
    if (e.target.value.length > 0) {
      setShowFiltered(true);
      console.log(countries.filter((country) => country.name.common.slice(0, newSearch.length).toLowerCase() === newSearch));
      setFilteredCountries(countries.filter((country) => country.name.common.slice(0, newSearch.length).toLowerCase() === newSearch));
    } else {
      setShowFiltered(false);
      setNewSearch('');
      setFilteredCountries([]);
    }

  }

  const setChosen = (e) => {
    const chosenCountry = e.target.parentNode.textContent.slice(0, -4).toLowerCase().trim();
    setFilteredCountries(countries.filter((country) => country.name.common.toLowerCase() === chosenCountry));
  }

  console.log(filteredCountries);

  return (
    <div className="App">
      <form>
        Find Countries: <input placeholder="Input country name..." onChange={ handleSearchChange }></input>
      </form>
      <Entries filteredCountries={ filteredCountries } setChosen={ setChosen } /> 
    </div>
  );
}

const Entries = ({ filteredCountries, setChosen }) => {
  console.log(filteredCountries);
  if (filteredCountries.length <= 0) {
    return (
      <div><p>You need to enter a country name</p></div>
    )
  } else if (filteredCountries.length > 10) {
    return (
      <div><p>Too many matches, specify country.</p></div>
    )
  } else if (filteredCountries.length === 1) {
    let country = filteredCountries[0];
    return (
      <ChosenEntry name={ country.name.common } capital={ country.capital[0] } area={ country.area } languages={ country.languages} flag={country.flags.png} />
    )
  } else {
    return (
      <div>
        { filteredCountries.map((country) => <Entry key={country.cca2} name={country.name.common} setChosen={ setChosen } />)}
      </div>
    )
  } 
}

const Entry = ({ name, setChosen }) => {
  return (
    <div>
      <div>{ name } <button onClick={ setChosen }>Show</button></div>
    </div>
  )
}

const ChosenEntry = ({name, capital, area, languages, flag}) => {
  console.log(languages);
  console.log(flag);
  return (
    <div>
      <h2> {name} </h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>

      <h3>Languages:</h3>
      <ul>
        <Languages languages={ languages } />
      </ul>
      <img src={ flag } alt={ 'flag' } />
    </div>
  )
}

const Languages = ({ languages }) => {
  console.log(languages);
  const languagesArray = [];
  for (let item in languages) {
    languagesArray.push([item, languages[item]]);
  }
  console.log(languagesArray);

  return (
    <div>
      {languagesArray.map((language) => <li key={language[0]}> { language[1] } </li>)}
    </div>
  )
}

// const language


export default App;
