import './App.css'

function Header(props){
  console.log(props)
  const { name } = props
  return(
    <header>
      <h1>This is a sample header with name {name}</h1>
    </header>
  )
}

let language = "Javascript"
let moon = "🌙"
function App() {
  return (
    <div>
        <Header name="Alex"/>
        <h1>Hello {language.toUpperCase()} {moon}!</h1>
    </div>
  )
}

export default App
