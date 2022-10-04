import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "555-555-4578"
    }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  }

  const handleNumChange = (e) => {
    console.log(e.target.value);
    setNewNum(e.target.value);
  }

  const addPerson = (e) => {
    e.preventDefault();
    if (newName === '' || newNum === '') {
      return alert('You must fill in all fields!');
    }
    // Check if phonebook already contains added name
    if (persons.find((person) => person.name === newName)) {
      return alert(`${newName} is already in the phonebook`);
    }
    const newPerson = { name: newName, number: newNum };
    return setPersons(persons.concat(newPerson));
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          *Name: <input onChange={handleNameChange}/>
        </div>
        <div>
          *Number: <input onChange={handleNumChange}/>
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
      { persons.map((person) => <Entry key={person.name} name={person.name} number={ person.number } />) }
    </div>
  )
}

const Entry = ({ name, number }) => {
  return (
    <div>
      <p>{ name } { number }</p>
    </div>
  )
}


export default App
