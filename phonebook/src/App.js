import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    phonebookService
    .getAll()
    .then(initialPhonebook => {
      console.log(initialPhonebook);
      setPersons(initialPhonebook);
    })
  }, [])

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


  const personsToShow = showAll ? persons : persons.filter((person) => person.name.slice(0, newFilter.length).toLowerCase() === newFilter);


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

    // Add new person to json server
    phonebookService
      .create(newPerson)
      .then(returnedNumber => {
        return setPersons(persons.concat(returnedNumber));
      })
  }

  const deleteNum = (e) => {
    console.log(typeof e.target.getAttribute('data-id'))
    const target = e.target.getAttribute('data-id');
    if (window.confirm(`Are you sure you want to delete ${e.target.parentNode.textContent.slice(0, -6)}`)) {
      phonebookService
      .deleteNum(target)
      .then(response => {
        console.log(`Deleted Number ${e.target.parentNode.textContent.slice(0, -6)}`);
        phonebookService
          .getAll()
          .then(returnedNumbers => {
            setPersons(returnedNumbers);
          })  
      });
    }

  }



  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange}/>

      <h3>Add a new Entry:</h3>

      <NewPersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />

      <h2>Numbers</h2>
      <Entries persons={ personsToShow } deleteNum={ deleteNum } /> 
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

const Entries = ({ persons, deleteNum }) => {
  return (
    <div>
      { persons.map((person) => <Entry key={person.id} id={person.id} name={person.name} number={ person.number } deleteNum={ deleteNum } />) }
    </div>
  )
}

const Entry = ({ name, number, deleteNum, id}) => {
  return (
    <div>
      { name } { number } <button onClick={ deleteNum } data-id={id}>Delete</button>
    </div>
  )
}


export default App
