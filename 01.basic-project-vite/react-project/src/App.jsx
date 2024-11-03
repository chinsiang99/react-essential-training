import './App.css'

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

function Main({dishes}){
  return (
    <ul>
      {dishes.map(dish => (
        // we use two curly braces if we want to have css styles
        <li style={{ listStyleType: 'none' }}>{dish}</li>
      ))}
    </ul>
  )
}

let language = "Javascript"
let moon = "🌙"
function App() {
  return (
    <div>
        <Header name="Alex" year={new Date().getFullYear()}/>
        <h1>Hello {language.toUpperCase()} {moon}!</h1>
        <Main dishes = {items}/>
    </div>
  )
}

export default App
