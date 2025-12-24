import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Profile from '../../components/Profile';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import ThreeBackground from '../../components/ThreeBackground';
import TechnicalArsenal from '../../components/TechnicalArsenal';
import SelectedWorks from '../../components/SelectedWorks';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }, [theme]);

    // Handle Hash Scroll on Load/Hash Change
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const elm = document.querySelector(hash);
                if (elm) {
                    elm.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        // Initial load
        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div className="relative min-h-screen font-sans selection:bg-nth-red selection:text-white">
            <ThreeBackground theme={theme} />

            <Navbar theme={theme} toggleTheme={toggleTheme} />

            <main className="relative z-10">
                <Profile />
                <Experience />
                <Education />
                <TechnicalArsenal />
                <SelectedWorks />
                <Contact />
            </main>

            <Footer />

            {/* Grid Overlay for texture - adjusted for theme visibility */}
            <div className={`fixed inset-0 pointer-events-none z-50 opacity-[0.03] ${theme === 'light' ? 'invert' : ''}`} style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
    );
};

export default Home;
