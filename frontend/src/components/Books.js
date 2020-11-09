import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'


const ALL_BOOKS = gql`
query allBooks($chosenGenre: String) {
  allBooks(genre: $chosenGenre) {
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

const getAllGenres = (books) => {
  let allGenres = []
  books.data.allBooks.forEach(book => {
    book.genres.forEach(genre => {
      if (!allGenres.includes(genre)){
        allGenres.push(genre)
      }
    });
  });
  return allGenres
}

const Books = (props) => {
  const [chosenGenre, setChosenGenre ] = useState('')
  const initialBooks = useQuery(ALL_BOOKS)
  const books = useQuery(ALL_BOOKS, {
    variables: { chosenGenre },
  })
  console.log(books)

  const setGenre = (genre) => {
    setChosenGenre(genre)
  }

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>books</h2>
      {chosenGenre.length > 0
      ? <p>in genre <b>{chosenGenre}</b></p>
      : null
      }
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
          {books && books.data && books.data.allBooks.map(a => {
            return (
              <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
      <div>
        {initialBooks && initialBooks.data && getAllGenres(initialBooks).map(g => 
          <button key={g} onClick={() => setGenre(g)}>
            {g}
            </button>
          )}
          <button onClick={() => setGenre('')}>
            all genres
          </button>
      </div>
    </div>
  )
}

export default Books