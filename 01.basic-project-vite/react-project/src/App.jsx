import './App.css'
import chef from './images/chef.jpg'
import { useEffect, useReducer, useState } from 'react'

function Header(props){
  const { name, year } = props
  return(
    <header>
      <h1>This is a sample header with name {name} created in {year}</h1>
    </header>
  )
}

const items = [
  "Macaroni & Cheese",
  "Salmon with Potatoes",
  "Tofu with Vegetables"
]

const dishObjects = items.map((dish, i)=>({
  id: i,
  title: dish
}))

function Main({dishes, status, onStatus}){
  return (
    <>
      <div>
        <h2>Welcome to this beautiful restaurant ! It is currently {status ? "open": "closed"}</h2>
        <button onClick={() => onStatus(!status)}>I want it to be {status ? "closed": "opened"}</button>
      </div>
      <main>
        <img src={chef} alt="chef image" height={200}/>
        <ul>
          {dishes.map(dish => (
            // we use two curly braces if we want to have css styles
            <li key={dish.id} style={{ listStyleType: 'none' }}>{dish.title}</li>
          ))}
        </ul>
      </main>
    </>
  )
}

let language = "Javascript"
let moon = "🌙"
function App() {
  // const [status, setStatus] = useState(true)
  // console.log(status)
  // we had another method to managing state, which is useReducer
  // the first argument in useReducer, is actually the toggle, the second one is initial value...
  const [status, toggle] = useReducer((status)=>!status, true)

  useEffect(()=>{
    console.log(`The restaurant is ${status? "open": "close"}`)
  }, []) // note here if we put empty array as second argument, it will only run on first render....
  return (
    <div>
        <h1>The restaurant is currently {status ? "open": "closed"}</h1>
        {/* <button onClick={() => setStatus(!status)}>{status ? "Close": "Open"} restaurant</button> */}
        <button onClick={() => toggle()}>{status ? "Close": "Open"} restaurant</button>
        <Header name="Alex" year={new Date().getFullYear()}/>
        <h1>Hello {language.toUpperCase()} {moon}!</h1>
        {/* <Main dishes = {dishObjects} status={status} onStatus={setStatus}/> */}
        <Main dishes = {dishObjects} status={status} onStatus={toggle}/>
    </div>
  )
}

export default App
