import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true);

  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  }

  const handleNumChange = (e) => {
    // console.log(e.target.value);
    setNewNum(e.target.value);
  }

  const handleFilterChange = (e) => {
    // console.log(e.target.value.length);
    if (e.target.value.length > 0) {
      setShowAll(false);
      setNewFilter(e.target.value.toLowerCase());
    } else {
      setShowAll(true);
      setNewFilter('');
    }
  }

  // const filterPersons = (persons) => {
  //   let filteredPersons = persons.filter((person) => {
  //   console.log(person);
  //   console.log(person.name.slice(0, newFilter.length));
    
  //   return person.name.slice(0, newFilter.length).toLowerCase() === newFilter;
  //   })

  //   return filteredPersons;

  // }

  const personsToShow = showAll ? persons : persons.filter((person) => person.name.slice(0, newFilter.length).toLowerCase() === newFilter);
  // const personsToShow = showAll ? persons : filterPersons(persons);
  // console.log(personsToShow);

  const addPerson = (e) => {
    e.preventDefault();
    if (newName === '' || newNum === '') {
      return alert('You must fill in all fields!');
    }
    // Check if phonebook already contains added name
    if (persons.find((person) => person.name === newName)) {
      return alert(`${newName} is already in the phonebook`);
    }
    // Check if phonebook already contains number (Not sure this will work with a string)
    if (persons.find((person) => person.number === newNum)) {
      return alert(`${newNum} is already in the phonebook`);
    }
    const newPerson = { name: newName, number: newNum, id: persons.length + 1};
    setNewName('');
    setNewNum('');
    // Query and reset all form inputs after adding person
    Array.from(document.querySelector('form').querySelectorAll('input')).forEach((input) => {
      input.value = '';
    })
    return setPersons(persons.concat(newPerson));
    
  }



  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange}/>

      <h3>Add a new Entry:</h3>

      <NewPersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />

      <h2>Numbers</h2>
      <Entries persons={ personsToShow } /> 
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      Filter show with <input onChange={handleFilterChange} />
    </div>
  )
}

const NewPersonForm = ({ addPerson, handleNameChange, handleNumChange}) => {
  return (
    <div>
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
    </div>
  )
}

const Entries = ({ persons }) => {
  return (
    <div>
      { persons.map((person) => <Entry key={person.id} name={person.name} number={ person.number } />) }
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
