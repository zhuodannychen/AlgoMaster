import Login from './Components/Login'
import Register from './Components/Register'
import Contests from "./Components/Contests"
import CreateContest from './Components/CreateContext'
import Profile from './Components/Profile'
import './App.css'
import ProtectedRoute from './Components/ProtectedRoute'

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="contests" element={<Contests />} />
        <Route path="create" element={ <CreateContest /> } />
        <Route path="profile" element={<Profile />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
