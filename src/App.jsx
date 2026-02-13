import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainContent from './components/Shift/MainContent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Shift Manager</h1>
      <MainContent />
    </>
  )
}

export default App
