import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  }

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      return alert(`${newName} is already in the phonebook`);
    } else {
      const newPerson = { name: newName };
      return setPersons(persons.concat(newPerson));
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Entries persons={ persons } /> 
      <div>debug: {newName}</div>
    </div>
  )
}

const Entries = ({ persons }) => {
  return (
    <div>
      { persons.map((person) => <Entry key={person.name} name={person.name} />) }
    </div>
  )
}

const Entry = ({ name }) => {
  return (
    <div>
      <p>{ name }</p>
    </div>
  )
}


export default App
