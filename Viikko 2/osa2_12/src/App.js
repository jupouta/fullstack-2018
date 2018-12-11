import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        countries: [],
        filter: ''
    }
    console.log('constructor')
  }

  componentDidMount() {
      console.log('did mount')
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log('promise fulfilled')
            this.setState({countries: response.data})
        })
  }
  
    handleFilter = (event) => {
        this.setState({filter: event.target.value.toLowerCase()})
    }


  render() {
      console.log('render')

      const newCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter))

      const setCountry = (country) => () => {
        const newFilter = country.name.toLowerCase()
        this.setState({ filter: newFilter })
      }

      const namesToShow =
    this.state.filter === '' || (newCountries.length) > 10?
      <p>too many matches, specify another filter</p> :
      newCountries.length === 1?
      <div>
        <h2>{newCountries[0].name} {newCountries[0].nativeName}</h2>
        <p>capital: {newCountries[0].capital}</p>
        <p>population: {newCountries[0].population}</p>
        <img src={newCountries[0].flag} alt='country flag' width="240" height="128"/>
      </div>:
      newCountries.map(country => <div key={country.numericCode} onClick={setCountry(country)}>{country.name}</div>)
    
    return (
      <div>
        find countries <input value={this.state.filter} onChange={this.handleFilter}/>
        {namesToShow}
      </div>
    )
  }
}

export default App