import { useState } from 'react'
import { Router } from './routes'
import { FirebaseProvider } from './context/firebase.context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FirebaseProvider>
        <Router/>
      </FirebaseProvider>
    </>
  )
}

export default App
