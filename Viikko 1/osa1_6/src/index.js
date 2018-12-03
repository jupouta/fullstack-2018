import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          hyva: 0,
          neutraali: 0,
          huono: 0
        }
    }

    kasvata = (haluttu) => {
        if (haluttu === "hyvä") {
            return () => {
                this.setState({hyva: this.state.hyva + 1})
            }
        }
        if (haluttu === "neutraali") {
            return () => {
                this.setState({neutraali: this.state.neutraali + 1})
            }
        }
        if (haluttu === "huono") {
            return () => {
                this.setState({huono: this.state.huono + 1})
            }
        }
    }

    render() {
        if (this.state.hyva === 0 && this.state.huono === 0 && this.state.neutraali === 0) {
            return (
                <div>
                    <Otsikko otsikko={'anna palautetta'}/>
                    <Button handleClick={this.kasvata("hyvä")} text="hyvä"/>
                    <Button handleClick={this.kasvata("neutraali")} text="neutraali"/>
                    <Button handleClick={this.kasvata("huono")} text="huono"/>
                    <Otsikko otsikko={'statistiikka'}/>
                    <p>ei yhtään palautetta annettu</p>
                </div>
            )
        }

        return (
            <div>
                <Otsikko otsikko={'anna palautetta'}/>
                <Button handleClick={this.kasvata("hyvä")} text="hyvä"/>
                <Button handleClick={this.kasvata("neutraali")} text="neutraali"/>
                <Button handleClick={this.kasvata("huono")} text="huono"/>
                <Otsikko otsikko={'statistiikka'}/>
                <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali}
                huono={this.state.huono}/>
            </div>
        )
    }
}

const Button = ({ handleClick, text}) => {
    return (
        <div>
            <button onClick={handleClick}>
            {text}
            </button>
        </div>
    )
}

const Statistics = (props) => {
    const kaikki = props.hyva + props.neutraali + props.huono
    const keskiarvo = (props.hyva*1 + props.neutraali*0 + props.huono*-1) / kaikki
    const positiivisia = props.hyva / kaikki * 100

    return (
        <div>
            <table>
                <tbody>
                <Statistic teksti={'hyvä'} arvo={props.hyva}/>
                <Statistic teksti={'neutraali'} arvo={props.neutraali}/>
                <Statistic teksti={'huono'} arvo={props.huono}/>
                <Statistic teksti={'keskiarvo'} arvo={keskiarvo}/>
                <Statistic teksti={'positiivisia'} arvo={positiivisia + " %"}/>
                </tbody>
            </table>
        </div>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.teksti}</td>
            <td>{props.arvo}</td>
        </tr>
    )
}
    

const Otsikko = (props) => {
    return (
        <div>
            <h2>{props.otsikko}</h2>
        </div> 
    )
}
    

ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
