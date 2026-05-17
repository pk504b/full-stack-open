import { useMutation, useQuery } from '@apollo/client/react'
import { GET_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'

const Authors = (props) => {
  const result = useQuery(GET_AUTHORS)
  const authors = result.data?.allAuthors

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const updateAuthor = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: {
        name,
        setBornTo: parseInt(born),
      },
    })
    setName('')
    setBorn('')
  }

  if (!props.show || !authors) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>update author</h3>
      <form onSubmit={updateAuthor}>
        <div>
          <label>
            name
            <select value={name} onChange={({ target }) => setName(target.value)}>
              <option value=""></option>
              {authors.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
