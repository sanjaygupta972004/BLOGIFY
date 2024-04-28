
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/about" element={<About/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/projects" element={<Projects/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
