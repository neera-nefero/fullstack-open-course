import { useState } from 'react'

// Components
const Button = ({ getRandomAnecdote }) => (
  <button onClick={getRandomAnecdote}>
    next anecdote
  </button>
)

// Components
const Vote = ({ increaseVoteAnecdote }) => (
  <button onClick={increaseVoteAnecdote}>
    vote
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // Array with anecdotes.lenght lenght filled with int 0 values
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0)
  const [mostVotedIndex, setMostVotedIndex] = useState(0)

  const getRandomAnecdote = () => {
    const min = 0
    const max = Math.floor(anecdotes.length)
    const random_index = Math.floor(Math.random() * (max - min) + min)
    setSelected(random_index)
  }

  const increaseVoteAnecdote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected]++
    setPoints(pointsCopy)

    const mostVotedIndexUpdated = pointsCopy.indexOf(Math.max(...pointsCopy));
    setMostVotedIndex(mostVotedIndexUpdated);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{points[selected]}</p>
      <Button getRandomAnecdote={getRandomAnecdote} />
      <Vote increaseVoteAnecdote={increaseVoteAnecdote} />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotedIndex]}</p>
    </div >
  )
}

export default App