import { useEffect, useState } from 'react'
import personServies from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([]) 
  const [query, setQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    personServies.getPersons().then((persons) => setPersons(persons))
  }, [])

  function addPerson(e) {
    e.preventDefault()
    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      const confirmation = confirm(`${existingPerson.name} already added to phonebook. Update phone number?`)
      if (!confirmation) return

      const newPerson = { ...existingPerson, number: newNumber }
      personServies.updatePerson(newPerson.id, newPerson).then((updatedPerson) => {
        setPersons(persons.map((person) => person.id === newPerson.id ? updatedPerson : person))
        setNewName('')
        setNewNumber('')
      }).catch((error) => {
        setError("Person doesn't exist")
        setTimeout(() => setError(''), 2000)
      })
      return
    }
    personServies.addPerson({ name: newName, number: newNumber }).then((newPerson) => {
      setPersons([...persons, newPerson])
      setNewName('')
      setNewNumber('')
      setNotification(`Added ${newPerson.name}`)
      setTimeout(() => setNotification(''), 2000)
    })
  }

  function deletePerson(id) {   
    const confirmation = confirm(`Delete ${persons.find((person) => person.id === id).name}?`)
    if (!confirmation) return

    personServies.deletePerson(id).then((deletedPerson) => {
      setPersons(persons.filter((person) => person.id !== id))
    })
    .catch((error) => {
      setError("Person already deleted")
      setTimeout(() => setError(''), 2000)
    })
  }

  if (!persons.length) return <div>Loading...</div>

  return (
    <div>
      <h2>Phonebook</h2>

      {notification && <div className="notification">{notification}</div>}
      {error && <div className="error">{error}</div>}

      <Filter query={query} setQuery={setQuery} />

      <h2>Add new number</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
      />

      <h2>Numbers</h2>
      <Persons persons={persons} query={query} deletePerson={deletePerson} />
    </div>
  )
}

export default App
