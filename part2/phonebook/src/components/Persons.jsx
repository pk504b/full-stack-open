import SinglePerson from "./SinglePerson"

export default function Persons({ persons, query, deletePerson }) {
  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
    {personsToShow.map((person) => (
        <SinglePerson key={person.id} person={person} deletePerson={deletePerson} />
      ))}
    </>
  )
}