import React from 'react'
import NavBar from './components/NavBar';
import IntroPage from './pages/IntroPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-black">
      <NavBar></NavBar>
      <IntroPage></IntroPage>
      <AboutPage></AboutPage>
      <ProjectsPage></ProjectsPage>
      <ExperiencePage></ExperiencePage>
      <ContactPage></ContactPage>
      <Footer></Footer>
    </div>
  )
}

export default App;
