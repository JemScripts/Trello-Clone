import { Routes, Route } from "react-router-dom"
import { Register } from "../pages/Register"
import { Dashboard } from "../pages/Dashboard"
import { ProtectedRoute } from "../components/ProtectedRoute"

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" 
        element={ 
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
      </Routes>
    </>
  )
}

export default App
