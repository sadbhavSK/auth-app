import { BrowserRouter, Routes, Route } from "react-router-dom"

import login from "./pages/login"
import Dashboard  from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path = "/login" element = {<login/>} />

      <Route path = "/dashboard"
      element ={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }
      />
    </Routes>
    </BrowserRouter>
  )
}
export default App;
