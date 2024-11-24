import './App.css'
import Footer from './Components/Footer'
import Manager from './Components/Manager'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <div className=''>
        <Manager />
      </div>  
      <Footer />

    </>
  )
}

export default App
