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
    <p><strong>Number of exercises</strong> {totalExercises}</p>
  )
}

export default function Course({ course }) {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/* USE REDUCE */}
      <Total totalExercises={course.parts.reduce((total, part) => total + part.exercises, 0)} />
    </div>
  )
}