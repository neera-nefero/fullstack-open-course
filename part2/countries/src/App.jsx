import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ searchCountry, countryResult, resultLimit, country, setCountry }) => {
  const tooManyMessage = 'Too many matches, specify another filter'
  let componentToRender = ''

  // render control
  if (searchCountry != '') {
    if (countryResult.length > resultLimit) {
      componentToRender = <RenderInfoMessage infoMessage={tooManyMessage} />
    } else if (countryResult.length === 1) {
      componentToRender = <RenderAdvancedList countryResult={countryResult} country={country} setCountry={setCountry} />
    } else {
      componentToRender = <RenderSimpleList countryResult={countryResult} />
    }
  }

  return (
    <div>
      {componentToRender}
    </div>
  )
}

const RenderInfoMessage = ({ infoMessage }) => {
  return (
    <p className="info-message">{infoMessage}</p>
  )
}
const RenderSimpleList = ({ countryResult }) => {
  return (
    <>
      <h2>Simple Result:</h2>
      <ul>
        {countryResult.map((country, i) =>
          <li key={i}>{country}</li>
        )}
      </ul>
    </>
  )
}
const RenderAdvancedList = ({ countryResult, country, setCountry }) => {
  let newCountry

  // TE HAS QUEDADO AQUI, INTENTANDO VOLCAR TODA LA INFO DEL OBJETO EN UNA ARRAY, U OTRO OBJECTO, PARA LUEGO MOSTRAR.

  // getting all the info of an specific country
  useEffect(() => {
    // skip if countryResult is not defined    
    if (countryResult) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryResult}`)
        .then(response => {
          // get the country needed information
          newCountry = response.data
          setCountry(newCountry)
        })
        .catch(error => {
          console.error('Error fetching countries:', error)
        });
    }
  }, [])

  console.log(newCountry)

  return (
    <>
      <h2>Advanced Result:</h2>
      <ul>
      </ul>
    </>
  )
}

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [countryResult, setCountryResult] = useState([])
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])

  const resultLimit = 10

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
          console.error('Error fetching countries:', error)
        });
    }
  }, [])

  const handleSearchCountry = (event) => {
    const newSearchCountry = event.target.value
    setSearchCountry(newSearchCountry)

    // Make filter with search values
    const newCountryResult = countries.filter((country) => country.toLowerCase().includes(newSearchCountry.toLowerCase()))
    setCountryResult(newCountryResult)
  }

  return (
    <div>
      <h1>Country search app</h1>
      <form>
        find countries: <input value={searchCountry} onChange={handleSearchCountry} />
      </form>
      <Countries searchCountry={searchCountry} countryResult={countryResult} country={country} setCountry={setCountry} resultLimit={resultLimit} />
    </div>
  )
}

export default App