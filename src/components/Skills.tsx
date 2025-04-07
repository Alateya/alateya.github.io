'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaBriefcase, FaDatabase, FaTools, FaChartBar, FaFileExcel } from 'react-icons/fa';
import { useState } from 'react';

const skillsData = {
  technical: [
    { name: 'Python', level: 90, color: 'from-blue-500/60 to-blue-600/60' },
    { name: 'Pandas', level: 95, color: 'from-blue-600/60 to-indigo-600/60' },
    { name: 'NumPy', level: 90, color: 'from-indigo-500/60 to-violet-500/60' },
    { name: 'Scikit-Learn', level: 85, color: 'from-violet-500/60 to-indigo-500/60' },
    { name: 'CatBoost', level: 80, color: 'from-blue-500/60 to-blue-600/60' },
    { name: 'Matplotlib', level: 85, color: 'from-indigo-500/60 to-blue-500/60' },
    { name: 'SQL', level: 80, color: 'from-blue-400/60 to-blue-500/60' },
    { name: 'Jupyter Notebook', level: 95, color: 'from-blue-500/60 to-indigo-500/60' },
    { name: 'Статистический анализ', level: 85, color: 'from-indigo-500/60 to-blue-500/60' },
    { name: 'Машинное обучение', level: 85, color: 'from-blue-500/60 to-indigo-500/60' },
    { name: 'Парсинг данных', level: 80, color: 'from-blue-500/60 to-indigo-500/60' },
    { name: 'Системная интеграция', level: 75, color: 'from-indigo-500/60 to-blue-500/60' },
  ],
  business: [
    { name: 'Управление проектами', level: 75, color: 'from-blue-500/60 to-indigo-500/60' },
    { name: 'Бизнес-аналитика', level: 80, color: 'from-indigo-500/60 to-blue-500/60' },
    { name: 'Презентационные навыки', level: 85, color: 'from-blue-500/60 to-indigo-500/60' },
    { name: 'Документирование', level: 90, color: 'from-indigo-500/60 to-blue-500/60' },
    { name: 'Визуализация данных', level: 85, color: 'from-blue-500/60 to-indigo-500/60' },
  ],
  tools: [
    { 
      name: 'Excel', 
      description: 'Продвинутые навыки работы с Excel, включая анализ данных, формулы и автоматизацию'
    },
    { 
      name: 'PowerPoint', 
      description: 'Создание профессиональных презентаций с визуализациями и графиками'
    },
    { 
      name: 'Jupyter Notebook', 
      description: 'Интерактивная среда для анализа данных и документирования результатов'
    },
    { 
      name: 'Git', 
      description: 'Система контроля версий для управления кодом и командной работы'
    },
    { 
      name: 'Pandas', 
      description: 'Библиотека для анализа, очистки и подготовки данных в Python'
    },
    { 
      name: 'Scikit-learn', 
      description: 'Библиотека для машинного обучения с широким набором алгоритмов и инструментов'
    },
  ],
  sql: [
    { 
      name: 'Сложные JOIN запросы', 
      description: 'Написание запросов с использованием INNER, LEFT, RIGHT JOIN, GROUP BY, HAVING и тд.'
    },
    { 
      name: 'Оконные функции', 
      description: 'Работа с оконными функциями (Window Functions) для продвинутого анализа'
    },
    { 
      name: 'Обработка данных', 
      description: 'Извлечение и форматирование данных с использованием EXTRACT, LOWER, UPPER и других функций'
    },
    { 
      name: 'Агрегация данных', 
      description: 'Применение агрегатных функций (AVG, SUM, COUNT) для статистического анализа'
    },
    { 
      name: 'Фильтрация и сортировка', 
      description: 'Эффективная фильтрация и сортировка больших наборов данных'
    },
    { 
      name: 'Оптимизация запросов', 
      description: 'Повышение производительности запросов с помощью индексов и оптимизации структуры'
    },
  ],
  dataScienceTools: [
    { 
      name: 'TensorFlow', 
      description: 'Открытая библиотека для глубокого обучения и нейронных сетей с широкими возможностями'
    },
    { 
      name: 'PyTorch', 
      description: 'Фреймворк для машинного обучения с гибкой архитектурой и динамическими вычислительными графами'
    },
    { 
      name: 'Power BI', 
      description: 'Инструмент для визуализации данных и создания интерактивных дашбордов'
    },
    { 
      name: 'Tableau', 
      description: 'Платформа для анализа и визуализации данных с интуитивным интерфейсом'
    },
    { 
      name: 'Apache Spark', 
      description: 'Система для распределённой обработки больших данных с высокой производительностью'
    },
    { 
      name: 'Plotly', 
      description: 'Библиотека для создания интерактивных визуализаций и дашбордов в Python'
    },
  ],
  additional: [
    {
      name: 'Научно-исследовательская работа',
      description: 'Проведение исследований, анализ научной литературы, разработка и проверка гипотез'
    },
    {
      name: 'Техническая документация',
      description: 'Создание подробной технической документации, инструкций и руководств для пользователей'
    },
    {
      name: 'Презентация результатов',
      description: 'Подготовка и проведение презентаций результатов проектов для различных аудиторий'
    },
    {
      name: 'Работа в условиях неопределенности',
      description: 'Эффективная работа с неполными данными и в условиях быстро меняющихся требований'
    },
    {
      name: 'Самообучение',
      description: 'Непрерывное изучение новых технологий, инструментов и методов для профессионального развития'
    },
    {
      name: 'Обработка текстовых данных',
      description: 'Анализ и обработка неструктурированных текстовых данных, извлечение значимой информации'
    },
    {
      name: 'Аналитические отчеты',
      description: 'Составление комплексных аналитических отчетов с выводами и рекомендациями'
    }
  ]
};

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
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
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      y: -8,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 50, 0.3)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const toolCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1 * i
      }
    }),
    hover: { 
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 20px -5px rgba(50, 100, 255, 0.15)",
      borderColor: "rgba(100, 150, 255, 0.3)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Декоративные элементы фона с анимацией */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div 
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px]"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/5 rounded-full filter blur-[100px]"
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
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
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Навыки и компетенции
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Технические и бизнес-навыки, которые помогают мне решать сложные задачи в области Data Science и анализа данных
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-dark/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:border-secondary/40 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Градиентный фон при наведении */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center mb-8 relative z-10">
              <motion.div 
                whileHover={{ 
                  rotate: 360,
                  backgroundColor: "rgba(68, 136, 255, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.3)"
                }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center text-secondary/90 mr-4 border border-white/10"
              >
                <FaCode className="text-xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">
                Технические навыки
              </h3>
            </div>
            
            <div className="space-y-6 relative z-10">
              {skillsData.technical.map((skill, index) => (
                <div 
                  key={index} 
                  className="group/skill cursor-pointer" 
                  onMouseEnter={() => setHoveredSkill(`tech-${index}`)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white group-hover/skill:text-secondary transition-colors duration-300">
                      {skill.name}
                    </span>
                    <span className={`font-medium transition-colors duration-300 ${
                      hoveredSkill === `tech-${index}` ? 'text-secondary' : 'text-white/70'
                    }`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden group-hover/skill:bg-white/10 transition-colors duration-300">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      whileHover={{ 
                        boxShadow: `0 0 8px 0px rgba(68, 136, 255, 0.5)` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-dark/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:border-secondary/40 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Градиентный фон при наведении */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center mb-8 relative z-10">
              <motion.div 
                whileHover={{ 
                  rotate: 360,
                  backgroundColor: "rgba(68, 136, 255, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.3)"
                }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center text-secondary/90 mr-4 border border-white/10"
              >
                <FaBriefcase className="text-xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">
                Бизнес-навыки
              </h3>
            </div>
            
            <div className="space-y-6 relative z-10">
              {skillsData.business.map((skill, index) => (
                <div 
                  key={index} 
                  className="group/skill cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(`business-${index}`)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white group-hover/skill:text-secondary transition-colors duration-300">
                      {skill.name}
                    </span>
                    <span className={`font-medium transition-colors duration-300 ${
                      hoveredSkill === `business-${index}` ? 'text-secondary' : 'text-white/70'
                    }`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden group-hover/skill:bg-white/10 transition-colors duration-300">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      whileHover={{ 
                        boxShadow: `0 0 8px 0px rgba(68, 136, 255, 0.5)` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center mb-8">
            <motion.div 
              whileHover={{ 
                rotate: 360,
                backgroundColor: "rgba(68, 136, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.3)"
              }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center text-secondary/90 mr-4 border border-white/10"
            >
              <FaFileExcel className="text-xl" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white">
              Инструменты
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillsData.tools.map((tool, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={toolCardVariants}
                whileHover="hover"
                className="bg-dark/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-secondary/90 transition-colors duration-300">{tool.name}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{tool.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center mb-8">
            <motion.div 
              whileHover={{ 
                rotate: 360,
                backgroundColor: "rgba(68, 136, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.3)"
              }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center text-secondary/90 mr-4 border border-white/10"
            >
              <FaDatabase className="text-xl" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white">
              Навыки работы с SQL
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillsData.sql.map((skill, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={toolCardVariants}
                whileHover="hover"
                className="bg-dark/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-secondary/90 transition-colors duration-300">{skill.name}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center mb-8">
            <motion.div 
              whileHover={{ 
                rotate: 360,
                backgroundColor: "rgba(68, 136, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.3)"
              }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center text-secondary/90 mr-4 border border-white/10"
            >
              <FaChartBar className="text-xl" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white">
              Инструменты Data Science
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillsData.dataScienceTools.map((tool, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={toolCardVariants}
                whileHover="hover"
                className="bg-dark/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-secondary/90 transition-colors duration-300">{tool.name}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{tool.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-8">
            <motion.div 
              whileHover={{ 
                rotate: 360,
                backgroundColor: "rgba(68, 136, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.3)"
              }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-dark rounded-lg flex items-center justify-center text-secondary/90 mr-4 border border-white/10"
            >
              <FaTools className="text-xl" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white">
              Дополнительные компетенции
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillsData.additional.map((skill, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={toolCardVariants}
                whileHover="hover"
                className="bg-dark/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-secondary/90 transition-colors duration-300">{skill.name}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills; 