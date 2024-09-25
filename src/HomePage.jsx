import React from 'react'

import NavBar from './HomeComponents/NavBar';
import Intro from './HomeComponents/Intro';
import About from './HomeComponents/About';
import Experience from './HomeComponents/Experience';
import Projects from './HomeComponents/Projects';
import Contact from './HomeComponents/Contact';
import Footer from './HomeComponents/Footer';

const HomePage = () => {
  return (
    <div className="bg-black">
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

export default HomePage;
