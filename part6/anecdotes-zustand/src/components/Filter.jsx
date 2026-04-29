import { useAnecdoteActions, useFilter } from "../store"

const Filter = () => {
  const filter = useFilter()
  const { setFilter } = useAnecdoteActions()
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(e) => setFilter(e.target.value)} value={filter} />
    </div>
  )
}

export default Filter