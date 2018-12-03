import React from 'react'
import ReactDOM from 'react-dom'


const Otsikko = (props) => {
    return (
        <div>
        <h1>{props.kurssi}</h1>
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14
          }
        ]
    }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa laskettavat={kurssi.osat}/>
    </div>
  )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa tehtava={props.osat[0]}/>
            <Osa tehtava={props.osat[1]}/>
            <Osa tehtava={props.osat[2]}/>
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.tehtava.nimi} {props.tehtava.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.laskettavat[0].tehtavia + props.laskettavat[1].tehtavia
         + props.laskettavat[2].tehtavia} tehtävää</p>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)