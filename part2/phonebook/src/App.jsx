import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Persons = ({ persons, setPersons }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.id} person={person} persons={persons} setPersons={setPersons} />
        )}
      </ul>
    </>
  )
}
const Person = ({ person, persons, setPersons }) => {
  const handleDeletePerson = (event) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      // Remove from DB    
      personService.remove(person.id)

      // Remove from browser Array
      const newPersonArray = (persons.filter((personInArray) => personInArray.id !== person.id))
      setPersons(newPersonArray)
    }
  }

  return (
    <>
      <li>{person.name} {person.number}</li><button onClick={handleDeletePerson}>delete</button>
    </>
  )
}

const Filter = ({ persons, setShowAll, setFilteredPersons }) => {
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) => {
    // Updating the search value
    const newUpdatedSearch = event.target.value
    setNewSearch(newUpdatedSearch)

    // If the search box has content...
    if (event.target.value != '') {
      setShowAll(false)
      // Loop in the phonebook search for names
      const searchResult = []
      persons.forEach(person => {
        const target = person.name.toLowerCase()
        const search = newUpdatedSearch.toLowerCase()
        // If match, we add it to the array
        if (target.includes(search)) {
          searchResult.push(person)
        }
      });

      setFilteredPersons(searchResult)
    } else {
      setShowAll(true)
    }
  }

  return (
    <>
      <p>filter shown with <input value={newSearch} onChange={handleSearchChange} /></p>
    </>
  )
}

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addPerson = (event) => {
    // Prevents to submit reload the page
    event.preventDefault()

    // Duplicate check loop persons array
    let duplicatedPerson = false;
    persons.map(person => {
      // If person exists
      if (person.name == newName) {
        duplicatedPerson = true;
        // If user wants to replace number
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          const duplicatedPersonObject = {
            name: newName,
            number: newNumber,
            id: persons.id
          }

          // Update person in DB    
          personService.update(person.id, duplicatedPersonObject)
            .then(returnedPerson => {
              // Add person in the browser array
              const newPersons = persons.map((person) => {
                if (person.id === returnedPerson.id) {
                  return returnedPerson
                } else {
                  return person
                }
              })
              setPersons(newPersons)
            });
        }
      }
    })

    if (duplicatedPerson === false) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      // Add person in DB
      personService.create(personObject)
        .then(returnedPerson => {
          // Add person in the browser array
          setPersons(persons.concat(personObject))
        });
    }

    // Clear inputs
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const personsToShow = showAll
    ? persons
    : filteredPersons

  // We use getAll() from the services/persons
  // Retrieve all the persons information from the .json
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons} showAll={showAll} setShowAll={setShowAll} setFilteredPersons={setFilteredPersons} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <Persons persons={personsToShow} setPersons={setPersons} />
    </div>
  )
}

export default App