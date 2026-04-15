function Header({ course }) {
  return (
    <h1>{course}</h1>
  )
}

function Content({ parts }) {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

function Part({ name, exercises }) {
  return (
    <p>{name} {exercises}</p>
  )
}

function Total({ totalExercises }) {
  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

export default function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total totalExercises={course.parts.reduce((total, part) => total + part.exercises, 0)} />
    </div>
  )
}