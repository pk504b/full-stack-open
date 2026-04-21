const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://pk504b:${password}@cluster0.5wyupeh.mongodb.net/fso_phonebook?appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })
  .then(() => console.log("Connected to database"))
  .catch(err => console.error(err))

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Persons', personSchema)