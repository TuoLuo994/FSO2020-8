import React, {useState} from 'react'
import { gql, useQuery } from '@apollo/client'


const ME = gql`
query {
  me{favoriteGenre}
}`
const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    author {
      name
      bookCount
      born
    }
    published
    genres
    id
  }
}`


const Books = (props) => {
  const favoriteGenre = useQuery(ME)
  const books = useQuery(ALL_BOOKS)

  
  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books with your favorite genre <b>{favoriteGenre.data.me.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(a => {
          if(a.genres.includes(favoriteGenre.data.me.favoriteGenre)){
          return <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>}
          return(null)
          }
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Books