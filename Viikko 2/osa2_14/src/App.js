import React from 'react';
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notif: null
    }
    console.log('constructor')
  }

  componentDidMount() {
      console.log('did mount')
      personService
        .getAll()
        .then(response => {
            console.log('promise fulfilled')
            this.setState({persons: response})
        })
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
        personService
            .create(personObject)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newName:'',
                    newNumber: '',
                    notif: `lisättiin ${newPerson.name}`
                })
                setTimeout(() => {
                    this.setState({ notif: null })
                  }, 5000)
            })
      } else if (names.includes(this.state.newName)) {
        if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
            const person = this.state.persons.find(p => p.name === this.state.newName)
            const modifiedPerson = {...person, number: this.state.newNumber}

            personService
                .update(modifiedPerson.id, modifiedPerson)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.map(person => person.id !== modifiedPerson.id ? person : response),
                        newName: '',
                        newNumber: '',
                        notif: `muutettiin henkilön ${modifiedPerson.name} numero`
                })
                setTimeout(() => {
                    this.setState({ notif: null })
                  }, 5000)
            })
                .catch(error => {

                    this.setState({
                        persons: this.state.persons.filter(person => person.id !== modifiedPerson.id),
                        newName: '',
                        newNumber: '',
                        notif: `henkilön ${modifiedPerson.name} tiedot on jo poistettu. lisää henkilö uudelleen`
                    })
                    setTimeout(() => {
                        this.setState({ notif: null })
                      }, 5000)
                    
              })
        }
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
    
    deletePerson = (id) => {
        return () => {
            const deleteName = this.state.persons.find(p => p.id === id)
            if (window.confirm(`poistetaanko ${deleteName.name}?`)) {
                console.log('deleting')
                personService
                    .deletePerson(id)
                
                console.log(this.state.persons)
                const newPersons = this.state.persons.filter(p => p.id !== id)
                console.log(newPersons)
                this.setState({
                    persons: newPersons,
                    notif: `poistettiin ${deleteName.name}`
                })
                setTimeout(() => {
                    this.setState({ notif: null })
                  }, 5000)
            }

        }     
    }

  render() {
      console.log('render')
    const namesToShow =
    this.state.filter === ''?
      this.state.persons :
      this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter))

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <NewNotification message={this.state.notif}/>
        <div>
            rajaa näytettäviä <input value={this.state.rajaus} onChange={this.handleFilter}/>
        </div>
        <h2>Lisää uusi / muuta olemassaolevan numeroa</h2>
        <AddPerson handleChange={this.addPerson} nameValue={this.state.newName}
        nameChange={this.handlePersonChange} numberValue={this.state.newNumber}
        numberChange={this.handleNumberChange}/>
        <h2>Numerot</h2>
            <Persons persons={namesToShow} deletePerson={this.deletePerson}/>
      </div>
    )
  }
}

const NewNotification = ({message}) => {
    if (message === null) {
        return null
      }
    
    return (
        <div className="message">
        {message}
        </div>

    )
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

const Persons = (props) => {
    return (
        <table>
            <tbody>
                {props.persons.map(person => <tr key={person.id}><td>{person.name}</td>
                <td>{person.number}</td><td><button onClick={props.deletePerson(person.id)}>poista</button></td></tr>)}
            </tbody>
        </table>
    )
}

export default App