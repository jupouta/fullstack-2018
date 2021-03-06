import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
    this.votes = {
        votes: [0,0,0,0,0,0]
    }
  }

  randomize = () => {
    const randomNumber = Math.floor((Math.random() * 6));
    return () => {
        this.setState({selected: randomNumber})
    }
  }

  vote = () => {
      return () => {
          this.setState({votes: this.votes.votes[this.state.selected] += 1})
      }
  }

  render() {
      const maxValue = Math.max.apply(Math, this.votes.votes)
      const indexOfValue = this.votes.votes.indexOf(maxValue)
        return (
            <div>
                {console.log(this.votes.votes)}
                {this.props.anecdotes[this.state.selected]}<br></br>
                has {this.votes.votes[this.state.selected]} votes<br></br>
                <button onClick={this.vote()}>vote</button>
                <button onClick={this.randomize()}>next anecdote</button>
                <h1>anecdote with most votes:</h1>
                <p>{this.props.anecdotes[indexOfValue]}<br></br>
                has {this.votes.votes[indexOfValue]} votes
                </p>
            </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)