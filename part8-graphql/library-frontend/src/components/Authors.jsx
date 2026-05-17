import { useQuery } from '@apollo/client/react'
import { GET_AUTHORS } from '../queries'

const Authors = (props) => {
  const result = useQuery(GET_AUTHORS)

  if (!props.show || !result.data) {
    return null
  }

  console.log(result.data)

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
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
