import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
let language = "Javascript"
let moon = "🌙"
function App() {
  return (
    <h1>Hello {language.toUpperCase()} {moon}!</h1>
  )
}

export default App
