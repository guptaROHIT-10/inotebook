import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (type,Message) => {
    setAlert({
      type: type,
      msg: Message
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }
  // useEffect(() => {}, []) (runs once on mount)
  // useEffect(() => {}, [value]) (runs when value changes)
  // useEffect(() => {}) (runs every render)


  return (
    <>
      <NoteState>
        <BrowserRouter>
          < Navbar showAlert={showAlert}
            title="NoteVault"
            navbarMode="dark" // dark, light
            bgMode="dark"   //dark,light,primary,success,danger
          />
          <Alert alert={alert}/>
          <div className="container">
            
            <Routes>

              <Route path="/Home" element={<Home showAlert={showAlert} />} />
              <Route path="/About" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} /> 
              <Route path="/signup" element={<SignUp showAlert={showAlert} />} />

            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}


export default App;
