import './App.css'

function Header(){
  return(
    <header>
      <h1>This is a sample header</h1>
    </header>
  )
}

let language = "Javascript"
let moon = "🌙"
function App() {
  return (
    <>
        <h1>Hello {language.toUpperCase()} {moon}!</h1>
        <Header></Header>
    </>
  )
}

export default App
