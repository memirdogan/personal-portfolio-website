import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Publications from './components/sections/Publications';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import Leadership from './components/sections/Leadership';
import BrandLine from './components/sections/BrandLine';
import Footer from './components/layout/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <div className="bg-gray-900 text-white">
            <Navbar />
            <main role="main">
              <Hero />
              <BrandLine />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Publications />
              <Leadership />
              <Education />
              <Contact />
            </main>
            <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
