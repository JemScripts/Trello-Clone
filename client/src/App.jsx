import { Routes, Route } from "react-router-dom"
import { Register } from "../pages/Register"
import { Login } from "../pages/Login"
import { Dashboard } from "../pages/Dashboard"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { Home } from "../pages/Home"
import { NavBar } from "../components/NavBar"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" 
        element={ 
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App
