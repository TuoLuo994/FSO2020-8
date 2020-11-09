import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const Login = ({setPage, show, setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }//,
    // update: (store, response) => {
    //   const dataInStore = store.readQuery({ query: ALL_PERSONS })
    //   store.writeQuery({
    //     query: ALL_PERSONS,
    //     data: {
    //       ...dataInStore,
    //       allPersons: [ ...dataInStore.allPersons, response.data.addPerson ]
    //     }
    //   })
    // }
  })

  useEffect(() => {
    if ( result.data ) {
      console.log('-->', result.data)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({
      variables: { username, password }
    })
    setPage('authors')

  }
  
  if (!show) {
    return null
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login