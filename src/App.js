import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import UserProfile from './Components/UserProfile'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    const token = sessionStorage.getItem('fakeJWT')
    setToken(token)
  }, [])
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            element={
              token ? (
                <Navigate replace to="/" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            exact
            element={
              token ? (
                <Navigate replace to="/profile" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
