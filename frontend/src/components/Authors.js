import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount
    }
  }
`
const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name,
      born
    }
  }
`
const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ updateAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    if ( result.data && !result.data.editAuthor) {
      window.alert('name not found')
    }
  }, [result.data]) // eslint-disable-line

  const authors = useQuery(ALL_AUTHORS)

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }
  if(authors.loading){
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name 
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}>
            {authors.data.allAuthors.map(a => 
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
          </div>
          <div>
            born 
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
          </div>
          <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
