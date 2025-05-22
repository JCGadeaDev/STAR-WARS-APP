
import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar'
import CharacterList from './pages/CharacterList'
import CharacterDetails from './pages/CharacterDetails'

function App() {
  return (
    <>
    <NavBar/>
    {/* Rutas donde va a navegar la aplicacion */}
    <div className='container'>
      <Routes>
        <Route path='/' element={<CharacterList/>}/>
        <Route path='/character/:id' element={<CharacterDetails/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
