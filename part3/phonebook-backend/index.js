require('dotenv').config()
const express = require("express")
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${data.length} persons</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  }).catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id).then(person => {
    res.json(person)
  }).catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const person = req.body

  if (!person.name || !person.number) {
    res.status(400).json({ error: "Missing name or number" })
    return
  }

  Person.create(person).then(person => {
    res.json(person)
  }).catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  Person.findById(id).then(person => {
    if (!person) {
      return res.status(404).end()
    }

    person.name = name
    person.number = number

    return person.save().then(updatedPerson => {
      res.json(updatedPerson)
    })
  }).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then(person => {
    res.status(204).end()
  }).catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})