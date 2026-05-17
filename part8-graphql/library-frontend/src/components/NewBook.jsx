import { useState } from 'react'
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from '../queries'
import { useMutation } from '@apollo/client/react'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: GET_BOOKS }, 
      { query: GET_AUTHORS }
    ],
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const publishedNumber = parseInt(published)

    console.log('add book...')
    addBook({
      variables: {
        title,
        author,
        published: publishedNumber,
        genres,
      },
    })

    // setTitle('')
    // setPublished('')
    // setAuthor('')
    // setGenres([])
    // setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          </label>
        </div>
        <div>
          <label>
            published
            <input
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </label>
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
