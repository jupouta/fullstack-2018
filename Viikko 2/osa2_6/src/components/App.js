import React from 'react';
import Persons from './Persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456', id: 1}
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
      event.preventDefault()

      var names = []

      var i
      for(i=0; i < this.state.persons.length; i++) {
        names.push(this.state.persons[i].name);
      };

      if (!(names.includes(this.state.newName))) {
        const personObject = {
            name: this.state.newName,
            id: this.state.persons.length + 1,
            number: this.state.newNumber
        }
      
        const persons = this.state.persons.concat(personObject)
  
        this.setState({persons: persons, newName: '', newNumber: ''})
      }
    }


    handlePersonChange = (event) => {
        this.setState({newName: event.target.value})
    }
    handleNumberChange = (event) => {
        this.setState({newNumber: event.target.value})
    }
    handleFilter = (event) => {
        this.setState({filter: event.target.value.toLowerCase()})
    }

  render() {
    const namesToShow =
    this.state.filter === ''?
      this.state.persons :
      this.state.persons.filter(person => person.name.toLocaleLowerCase().includes(this.state.filter))

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
            rajaa näytettäviä <input value={this.state.rajaus} onChange={this.handleFilter}/>
        </div>
        <h2>Lisää uusi</h2>
        <AddPerson handleChange={this.addPerson} nameValue={this.state.newName}
        nameChange={this.handlePersonChange} numberValue={this.state.newNumber}
        numberChange={this.handleNumberChange}/>
        <h2>Numerot</h2>
            <Persons persons={namesToShow}/>
      </div>
    )
  }
}

const AddPerson = (props) => {
  return (
      <form onSubmit={props.handleChange}>
      <div>
          nimi: <input value={props.nameValue} onChange={props.nameChange}/>
      </div>
      <div>
          numero: <input value={props.numberValue} onChange={props.numberChange}/>
      </div>
      <div>
          <button type="submit">lisää</button>
      </div>
      </form>
    )
}

export default App