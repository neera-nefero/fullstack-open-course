import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])

  // getting all the countries names
  useEffect(() => {
    // skip if countries is not defined    
    if (countries) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          // putting all the names in countries useState
          setCountries(response.data.map((country) => country.name.common))
        })
        .catch(error => {
          console.error('Error fetching countries:', error);
        });
    }
  }, [])

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)

    console.log(countries);
  }

  return (
    <div>
      <form>
        find countries: <input value={searchCountry} onChange={handleSearchCountry} />
      </form>
      <pre>
      </pre>
    </div>
  )
}

export default App