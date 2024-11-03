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

const dishObjects = items.map(dish=>({
  id: i,
  title: dish
}))

function Main({dishes}){
  return (
    <ul>
      {dishes.map(dish => (
        // we use two curly braces if we want to have css styles
        <li key={dish.id} style={{ listStyleType: 'none' }}>{dish.title}</li>
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
        <Main dishes = {dishObjects}/>
    </div>
  )
}

export default App
