import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import FooterCom from "./components/Footer"
import { PrivateRoute } from "./components/PrivateRoute"
import AdminPrivateRoute from "./components/post/AdminPrivateRoute"
import  Post  from "./pages/Post"

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/about" element={<About/>} />
            <Route element = {<PrivateRoute/>} >
              <Route path="/dashboard" element={<Dashboard/>} />
           </Route>
           <Route element = {<AdminPrivateRoute/>} >
            <Route path="/post" element={<Post />} />
           </Route>
            <Route path="/projects" element={<Projects/>} />
      </Routes>
      <FooterCom/>
      </BrowserRouter>
  )
}

export default App
