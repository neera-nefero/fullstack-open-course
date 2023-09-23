import { useState } from 'react'

const Persons = ({ persons }) => {
  return (
    <>
    <h2>Numbers</h2>
    <ul>
      {persons.map(person =>
        <Person key={person.id} person={person} />
      )}
    </ul>
    </>
  )
}
const Person = ({ person }) => {
  return (
    <>
    <li>{person.name} {person.number}</li>
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
    if (event.target.value != '')
    {
      setShowAll(false)
      // Loop in the phonebook search for names
      const searchResult = []      
      persons.forEach(person => {
        const target = person.name.toLowerCase()
        const search = newUpdatedSearch.toLowerCase()
        // If match, we add it to the array
        if (target.includes(search))
        {
          searchResult.push(person) 
        }        
      });
      
      setFilteredPersons(searchResult)
    } else 
    {
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

    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }

    // Duplicate check
    let duplicatedNameFound = false
    persons.map(person => {
      if (person.name == personObject.name) {
        // Template string
        alert(`${personObject.name} is already added to phonebook`)
        //alert(personObject.name + ' is already added to phonebook')
        duplicatedNameFound = true
      }
    }
    )
    // Check if name already exist
    if (duplicatedNameFound === false) { 
      setPersons(persons.concat(personObject))
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
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-1234567' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [showAll, setShowAll] = useState(true)
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const personsToShow = showAll
  ? persons
  : filteredPersons

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons} showAll={showAll} setShowAll={setShowAll} setFilteredPersons={setFilteredPersons} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App