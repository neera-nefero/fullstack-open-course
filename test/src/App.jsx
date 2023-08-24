import { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    const updatedLeft = left + 1

    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    setTotal(updatedLeft + right)

  }

  const handleRightClick = () => {
    const updatedRight = right + 1

    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left + updatedRight)
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const History = (props) => {
    if (props.allClicks.length === 0) {
      return (
        <p>
          the app is used by pressing the buttons
        </p>
      )
    }
    return (
      <p>
        button press history: {props.allClicks.join(' ')}
      </p>
    )
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <p>{total}</p>
      <History allClicks={allClicks} />
    </div>
  )
}

export default App