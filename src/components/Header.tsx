'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlurryText = ({ text }) => {
  const [letterHovered, setLetterHovered] = useState(null);
  
  return (
    <motion.span className="relative inline-block">
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          className="relative inline-block transition-all duration-300 origin-center"
          onMouseEnter={() => setLetterHovered(index)}
          onMouseLeave={() => setLetterHovered(null)}
          animate={{
            scale: letterHovered === index ? 1.3 : 1,
            y: letterHovered === index ? -2 : 0,
            color: letterHovered === index ? 'rgb(100, 150, 255)' : 'rgb(255, 255, 255)',
            textShadow: letterHovered === index 
              ? '0 0 8px rgba(100, 150, 255, 0.7)' 
              : '0 0 0px rgba(100, 150, 255, 0)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      
      // Определение активного раздела на основе текущей позиции прокрутки
      const sections = ['home', 'projects', 'skills', 'achievements'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      // Находим текущий активный раздел в зависимости от положения
      const currentSectionIndex = sectionElements.findIndex(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        // Секция считается активной, если её верхняя граница находится не ниже 30% от верха окна
        // и нижняя граница всё ещё видна (не выше верха окна)
        return rect.top <= window.innerHeight * 0.3 && rect.bottom > 0;
      });
      
      if (currentSectionIndex !== -1) {
        setActiveSection(sections[currentSectionIndex]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Главная', href: '#home', id: 'home' },
    { name: 'Проекты', href: '#projects', id: 'projects' },
    { name: 'Навыки', href: '#skills', id: 'skills' },
    { name: 'Достижения', href: '#achievements', id: 'achievements' },
  ];

  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <BlurryText text="EIS Portfolio" />
        </motion.div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                className="relative"
                onMouseEnter={() => setHoveredMenuItem(item.id)}
                onMouseLeave={() => setHoveredMenuItem(null)}
              >
                <a
                  href={item.href}
                  className={`text-white/80 hover:text-white transition-all duration-300 py-2 block ${
                    activeSection === item.id ? 'text-white' : ''
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full" 
                      layoutId="activeSection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  {/* Эффект при наведении, если пункт не активен */}
                  {hoveredMenuItem === item.id && activeSection !== item.id && (
                    <motion.div 
                      className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-secondary/50 rounded-full" 
                      layoutId="hoverSection"
                      initial={{ width: '0%', left: '50%', right: '50%' }}
                      animate={{ width: '50%', left: '25%', right: '25%' }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        <div className="md:hidden">
          <motion.button 
            className="text-white p-2 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
            <motion.div 
              className="absolute inset-0 rounded-full bg-secondary/10"
              initial={{ scale: 0 }}
              animate={{ scale: mobileMenuOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="absolute inset-0 bg-dark/95 backdrop-blur-lg" 
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              className="relative z-50 p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <ul className="flex flex-col space-y-6">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                    className="border-b border-white/10 pb-4"
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href={item.href}
                      className={`text-white text-2xl font-medium block relative ${
                        activeSection === item.id ? 'text-secondary' : ''
                      }`}
                      onClick={handleMenuItemClick}
                    >
                      <span>{item.name}</span>
                      {activeSection === item.id && (
                        <motion.div 
                          className="absolute left-0 w-2 h-full rounded-full bg-secondary"
                          layoutId="activeMobileSection"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: -10 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 