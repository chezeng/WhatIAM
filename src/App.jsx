import React from 'react'

import NavBar from './components/NavBar';
import Intro from './components/Intro';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ParallaxText from './components/ParallaxText';
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-black w-screen">
      <NavBar></NavBar>
      <Intro></Intro>
      <ParallaxText baseVelocity={-5}>A Little Bit</ParallaxText>
      <ParallaxText baseVelocity={5}>About Me</ParallaxText>
      <About></About>
      <Projects></Projects>
      <Experience></Experience>
      <Contact></Contact>
    </div>
  )
}

export default App;
