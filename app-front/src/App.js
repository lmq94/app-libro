
import './App.css';
import Crud from './Crud';
import {Navbar, Footer} from './Template'
import BookForm from './BookForm'
import {BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom';



function App() {
  return (
    <Router>
      <div className = "App">
        <Navbar/>
        <main className = "container">
          <Routes>
            <Route path = "/" element = {<Crud/>} />
            <Route path = "/agregar-libro" element = {<BookForm/>} />
            
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
