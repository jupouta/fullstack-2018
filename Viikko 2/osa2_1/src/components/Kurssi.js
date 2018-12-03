import React from 'react'

const Kurssi = (props) => {
    const kurssi = props.kurssi
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat}/>
            <Yhteensa laskettavat={kurssi.osat}/>
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <div>
        <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map(osa => <p key={osa.id}>{osa.nimi} {osa.tehtavia}</p>)}
        </div>
    )
}

const Yhteensa = (props) => {
    const tehtavat = props.laskettavat.map(osa => osa.tehtavia)
    const yhteensa = tehtavat.reduce((acc, cur) => acc + cur)
    return (
        <p>yhteensä {yhteensa} tehtävää</p>
    )
}

export default Kurssi