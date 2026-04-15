import { useState } from 'react'

function Button({ text, onClick }) {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

function Statistics({ good, neutral, bad }) {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="Good" value={good} />
        <StatisticsLine text="Neutral" value={neutral} />
        <StatisticsLine text="Bad" value={bad} />
        <StatisticsLine text="Total" value={good + neutral + bad} />
        <StatisticsLine text="Average" value={(good - bad) / (good + neutral + bad)} />
        <StatisticsLine text="Positive" value={(good / (good + neutral + bad)) * 100} />
      </tbody>
    </table>
  )
}

function StatisticsLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <>
      <h1>Give feedback</h1>

      <div>
        <Button text="Good" onClick={() => setGood(good + 1)} />
        <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button text="Bad" onClick={() => setBad(bad + 1)} />
      </div>

      <div>
        <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  )
}

export default App
