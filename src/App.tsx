import { lazy, Suspense } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import BrandLine from './components/sections/BrandLine';

// Lazy load below-the-fold sections
const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Publications = lazy(() => import('./components/sections/Publications'));
const Events = lazy(() => import('./components/sections/Events'));
const Education = lazy(() => import('./components/sections/Education'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Leadership = lazy(() => import('./components/sections/Leadership'));
const Footer = lazy(() => import('./components/layout/Footer'));

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
            <Navbar />
            <main role="main">
              <Hero />
              <BrandLine />
              <Suspense fallback={null}>
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Publications />
                <Events />
                <Leadership />
                <Education />
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
