import React from 'react'
import { Analytics } from "@vercel/analytics/react"
import NavBar from './components/NavBar';
import Intro from './components/Intro';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-black">
      <Analytics/>
      <NavBar></NavBar>
      <Intro></Intro>
      <About></About>
      <Projects></Projects>
      <Experience></Experience>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  )
}

export default App;
