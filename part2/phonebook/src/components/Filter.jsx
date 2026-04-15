export default function Filter({ query, setQuery }) {
  return (
    <div>
      filter shown with: <input value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  )
}