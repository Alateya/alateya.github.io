'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Отслеживаем скролл для показа/скрытия кнопки
  useEffect(() => {
    const toggleVisibility = () => {
      // Показываем кнопку, когда страница прокручена на 300px вниз
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    // Очистка слушателя событий
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Функция для прокрутки наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Варианты анимации для кнопки
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: '0 10px 20px rgba(50, 100, 255, 0.25)'
    },
    tap: {
      scale: 0.95
    }
  };
  
  // Варианты анимации для стрелки внутри кнопки
  const arrowVariants = {
    initial: { y: 0 },
    hover: {
      y: -3,
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.5
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed bottom-8 right-8 z-50 p-3 rounded-full border text-white shadow-lg transition-all duration-300 ${
            isHovered 
              ? 'bg-secondary/40 backdrop-blur-md border-secondary/60' 
              : 'bg-dark/40 backdrop-blur-sm border-white/20'
          }`}
          onClick={scrollToTop}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Прокрутить наверх"
        >
          <motion.div
            variants={arrowVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            <FaChevronUp className={`text-lg ${isHovered ? 'text-white' : 'text-secondary/90'}`} />
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full -z-10 opacity-0"
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute -inset-1 rounded-full bg-secondary/20 z-[-1] opacity-0"
            animate={isHovered ? { 
              opacity: [0, 0.5, 0],
              scale: [1, 1.2, 1]
            } : { opacity: 0 }}
            transition={{
              repeat: Infinity,
              duration: 2
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 