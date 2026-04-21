const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URI, { family: 4 })
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