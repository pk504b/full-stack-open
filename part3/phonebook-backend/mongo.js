const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.error("Provide database pass as first argument")
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://pk504b:${password}@cluster0.5wyupeh.mongodb.net/fso_phonebook?appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Persons', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log("phonebook:")
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  
  newPerson.save().then(person => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

