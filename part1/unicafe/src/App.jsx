import { useState } from 'react'

// Components
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <>
        <h3>No feedback given:</h3>
      </>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text='Good' value={props.good} />
        <StatisticsLine text='Neutral' value={props.neutral} />
        <StatisticsLine text='Bad' value={props.bad} />
        <StatisticsLine text='All' value={props.all} />
        <StatisticsLine text='Average' value={props.average} />
        <StatisticsLine text='Positive' value={props.positive} />
      </tbody>
    </table >
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const App = () => {
  // Functions
  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = all + 1

    setGood(good + 1)
    setAll(updatedGood + neutral + bad)
    setAverage((updatedGood - bad) / updatedAll);
    setPositive(updatedGood / updatedAll * 100);
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = all + 1

    setNeutral(neutral + 1)
    setAll(good + updatedNeutral + bad)
    setAverage((good - bad) / updatedAll);
    setPositive(good / updatedAll * 100);
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = all + 1

    setBad(bad + 1)
    setAll(good + neutral + updatedBad)
    setAverage((good - bad) / updatedAll);
    setPositive(good / updatedAll * 100);
  }


  // save clicks of each button to its own state
  // Constants
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  return (
    <div>
      <h1>Unicafe review system</h1>
      <h3>Can you provide us your statisfaction with the service?</h3>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <h3>Statistics:</h3>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App