import Login from './Components/Login'
import Register from './Components/Register'
import Contests from "./Components/Contests/ContestList"
import CreateContest from './Components/Contests/CreateContest'
import Profile from './Components/Profile'
import Comments from './Components/Contests/Comments'
import ContestPage from './Components/Contests/ContestPage'
import './App.css'
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
        <Route path="comments" element={<Comments /> } />
        <Route path="/contests/:contestid" element={<ContestPage />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
