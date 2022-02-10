import React, { useState, useEffect } from 'react'
import SocketIOClient from 'socket.io-client'
import './App.css'

const URL = 'http://localhost:4000'

const socket = SocketIOClient(URL, {
  transports: ['websocket'],
})

const App = () => {
  const [response, setResponse] = useState([''])
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    socket.emit('message', message)
    setMessage('')
  }

  function handleChangeInput(e) {
    e.preventDefault()
    setMessage(e.target.value)
  }

  useEffect(() => {
    socket.on('update', (messageRes) => {
      setResponse((old) => old.concat(messageRes))
    })
  }, [])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChangeInput}
          autoFocus={true}
        ></input>
        <button type="submit">Send</button>
      </form>
      <div className="chat">
        {response.map((value) => (
          <p>{value}</p>
        ))}
      </div>
    </div>
  )
}

export default App
