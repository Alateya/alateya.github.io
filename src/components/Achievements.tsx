'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTrophy, FaChartLine, FaRocket, FaCogs, FaLightbulb, FaDatabase, FaUsers } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const achievementsData = [
  {
    id: 1,
    icon: <FaChartLine />,
    title: 'Модель прогнозирования с высокой точностью',
    description: 'Внедрение модели прогнозирования на 52 недели вперед с коэффициентом детерминации R² = 0.99, что позволило оптимизировать ценовую политику и снизить ошибки прогнозирования на 35%',
    highlight: '35%' ,
    countValue: 35
  },
  {
    id: 2,
    icon: <FaTrophy />,
    title: 'Исследование индекса счастья',
    description: 'Создание и проведение исследования по индексу счастья',
    highlight: '',
    countValue: null
  },
  {
    id: 3,
    icon: <FaRocket />,
    title: 'Автоматизация процессов сбора данных',
    description: 'Автоматизация процессов сбора и анализа данных с помощью парсеров, что повысило точность данных на 25% и сократило трудозатраты на 60%',
    highlight: '60%',
    countValue: 60
  },
  {
    id: 4,
    icon: <FaCogs />,
    title: 'Оптимизация бизнес-процессов',
    description: 'Разработка комплексного решения для анализа данных кофеен, что привело к оптимизации бизнес-процессов и увеличению рентабельности на 15%',
    highlight: '15%' ,
    countValue: 15
  },
  {
    id: 5,
    icon: <FaDatabase />,
    title: 'Система анализа дубликатов',
    description: 'Разработка системы анализа дубликатов, позволившей выявить и устранить критические несоответствия в базе данных, повысив качество данных на 40%',
    highlight: '40%' ,
    countValue: 40
  },
  {
    id: 6,
    icon: <FaUsers />,
    title: 'Сервис анализа данных',
    description: 'Разработка системы сквозной аналитики',
    highlight: '',
    countValue: null
  },
  {
    id: 7,
    icon: <FaLightbulb />,
    title: 'Модель кредитного скоринга',
    description: 'Разработка модели кредитного скоринга с точностью 85%, что снизило риски невозврата кредитов на 30%',
    highlight: '30%',
    countValue: 30
  }
];

// Компонент для анимации чисел
const CountUp = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!inView || !end) return;

    let startTime: number | undefined;
    let animationFrame: number | undefined;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [inView, end, duration]);

  return <span ref={inViewRef}>{count}%</span>;
};

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
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

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        delay: 0.1 * index
      },
    }),
    hover: { 
      y: -8,
      boxShadow: "0 10px 30px -5px rgba(50, 100, 255, 0.15)",
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  // Функция для выделения важных частей текста
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <span key={i} className="font-semibold text-white">{part}</span> 
        : part
    );
  };

  // Эффект свечения для иконок
  const glowEffect = {
    hidden: { boxShadow: '0 0 0 rgba(68, 136, 255, 0)' },
    visible: {
      boxShadow: [
        '0 0 0 rgba(68, 136, 255, 0)',
        '0 0 20px rgba(68, 136, 255, 0.5)',
        '0 0 0 rgba(68, 136, 255, 0)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const
      }
    }
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      {/* Декоративные элементы фона с анимацией */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div 
          className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        ref={ref}
      >
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Достижения
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-primary/60 to-secondary/60 mx-auto rounded-full mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.p 
            className="text-lg text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Ключевые результаты и профессиональные достижения в проектах, демонстрирующие эффективность и практическую ценность
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-dark/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 h-full group relative"
              onMouseEnter={() => setHoveredCard(achievement.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Затемнение при наведении */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 z-[2]"></div>
              
              {/* Градиентный фон при наведении */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Анимированные частицы при наведении */}
              {hoveredCard === achievement.id && (
                <motion.div
                  className="absolute inset-0 overflow-hidden z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-secondary/50 rounded-full"
                      initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: Math.random() * 100 + "%",
                        opacity: 0
                      }}
                      animate={{ 
                        y: [null, "-100%"],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{ 
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </motion.div>
              )}

              <div className="p-8 relative z-10">
                <motion.div 
                  className="w-12 h-12 mb-6 bg-dark/80 rounded-lg flex items-center justify-center text-secondary/90 text-xl border border-white/10 group-hover:text-white group-hover:bg-secondary/30 transition-all duration-300"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.6 }
                  }}
                  variants={glowEffect}
                  animate={hoveredCard === achievement.id ? "visible" : "hidden"}
                >
                  {achievement.icon}
                </motion.div>
                
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-secondary/90 transition-colors duration-300">
                  {achievement.title}
                </h3>
                
                <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {achievement.countValue ? (
                    <>
                      {achievement.description.split(achievement.highlight)[0]}
                      <span className="font-semibold text-secondary">
                        <CountUp end={achievement.countValue} />
                      </span>
                      {achievement.description.split(achievement.highlight)[1]}
                    </>
                  ) : (
                    highlightText(achievement.description, achievement.highlight)
                  )}
                </p>
                
                {/* Декоративная линия внизу карточки */}
                <motion.div 
                  className="mt-6 h-0.5 bg-gradient-to-r from-secondary/50 to-primary/50 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Achievements; 