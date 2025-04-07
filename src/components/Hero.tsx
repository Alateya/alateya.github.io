'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

// Заменяем TypeAnimation на анимированный текст с подсветкой
const AnimatedDescription = ({ text }) => {
  // Ключевые слова для выделения
  const keywordsToHighlight = [
    'Data Science', 
    'анализа данных', 
    'системной интеграции', 
    'моделей прогнозирования', 
    'бизнес-процессов', 
    'базами данных'
  ];
  
  // Функция для выделения ключевых слов
  const highlightKeywords = (text) => {
    let result = [];
    let lastIndex = 0;
    
    // Создаем регулярное выражение для поиска всех ключевых слов
    const keywordsPattern = new RegExp(`(${keywordsToHighlight.join('|')})`, 'g');
    
    // Находим совпадения и создаем массив с выделенными ключевыми словами
    const matches = Array.from(text.matchAll(keywordsPattern));
    
    matches.forEach((match, i) => {
      const [keyword] = match;
      const startIndex = match.index;
      
      // Добавляем текст до ключевого слова
      if (startIndex > lastIndex) {
        result.push(
          <span key={`text-${i}`} className="text-white/80">
            {text.substring(lastIndex, startIndex)}
          </span>
        );
      }
      
      // Добавляем выделенное ключевое слово
      result.push(
        <motion.span 
          key={`highlight-${i}`}
          className="text-secondary font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.8 + (i * 0.2), 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          {keyword}
        </motion.span>
      );
      
      lastIndex = startIndex + keyword.length;
    });
    
    // Добавляем оставшийся текст
    if (lastIndex < text.length) {
      result.push(
        <span key="text-end" className="text-white/80">
          {text.substring(lastIndex)}
        </span>
      );
    }
    
    return result;
  };
  
  return (
    <motion.p
      className="relative text-lg md:text-xl leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {highlightKeywords(text)}
    </motion.p>
  );
};

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  // Эффект для отслеживания позиции мыши
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };
  
  // Анимация для текста
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.1,
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 12,
        stiffness: 100
      } 
    }
  };
  
  const titleDataScience = "Data Science".split("");
  const titleSpecialist = "специалист".split("");
  
  // Описание для статичного текста с анимацией
  const description = "Специалист в области Data Science, анализа данных и системной интеграции с опытом в разработке систем моделей для прогнозирования, анализе бизнес-процессов и работе с базами данных.";
  
  // Стили для элементов с эффектом параллакса от движения мыши
  const calculateMovement = (axis, strength = 20) => {
    if (!isMounted) return 0;
    const windowCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    
    const maxMovement = strength;
    
    if (axis === 'x') {
      return ((mousePosition.x - windowCenter.x) / windowCenter.x) * maxMovement;
    } else {
      return ((mousePosition.y - windowCenter.y) / windowCenter.y) * maxMovement;
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-start justify-center pt-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Декоративные элементы фона с эффектом параллакса */}
      {isMounted && (
        <>
          <motion.div 
            className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
            animate={{
              x: calculateMovement('x', -15),
              y: calculateMovement('y', -15)
            }}
            transition={{ type: "spring", damping: 25, stiffness: 50 }}
          />
          <motion.div 
            className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"
            animate={{
              x: calculateMovement('x', 15),
              y: calculateMovement('y', 15)
            }}
            transition={{ type: "spring", damping: 25, stiffness: 50 }}
          />
        </>
      )}
      
      <motion.div
        className="container mx-auto px-6 flex flex-col items-center text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div 
          variants={titleVariants}
          className="mb-8 relative"
        >
          <div className="text-3xl md:text-5xl font-bold text-white mb-2">
            <motion.div className="overflow-hidden">
              {titleDataScience.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div className="overflow-hidden">
              {titleSpecialist.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="inline-block text-secondary/90"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.div>
          </div>
          {/* Декоративная линия под заголовком */}
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-primary/60 to-secondary/60 mx-auto rounded-full mt-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
          />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 gap-6 w-full max-w-sm mb-12"
        >
          <motion.a 
            href="#projects" 
            className="col-span-1 px-5 py-2.5 bg-dark/60 hover:bg-dark/80 text-white font-medium rounded-lg border border-secondary/30 hover:border-secondary/60 transition-all duration-300 text-sm relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Проекты</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
            />
          </motion.a>
          <motion.a 
            href="#contact" 
            className="col-span-1 px-5 py-2.5 bg-secondary/10 hover:bg-secondary/20 text-white font-medium rounded-lg border border-secondary/30 hover:border-secondary/60 transition-all duration-300 text-sm relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Контакты</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
        
        <AnimatedDescription text={description} />
        
        <motion.div 
          variants={itemVariants}
          className="flex justify-center w-full mt-24"
        >
          <motion.div 
            className="animate-bounce cursor-pointer"
            whileHover={{ scale: 1.2, y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-secondary"
            >
              <path 
                d="M7 10L12 15L17 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 