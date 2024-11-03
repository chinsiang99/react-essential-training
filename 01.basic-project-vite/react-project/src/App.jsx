import './App.css'

function Header(props){
  const { name, year } = props
  return(
    <header>
      <h1>This is a sample header with name {name} created in {year}</h1>
    </header>
  )
}

let language = "Javascript"
let moon = "🌙"
function App() {
  return (
    <div>
        <Header name="Alex" year={new Date().getFullYear()}/>
        <h1>Hello {language.toUpperCase()} {moon}!</h1>
    </div>
  )
}

export default App
