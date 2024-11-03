import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// const animals = ["giraffe", "zebra", "tiger"]
// const [first, second, third] = ["giraffe", "zebra", "tiger"]
// console.log(animals[0])
// console.log(first)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
