'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Данные проектов из roadmap.md
const projectsData = [
  {
    id: 1,
    title: 'Система прогнозирования цен на индейку',
    description: 'Создание системы прогнозирования цен на индейку  с использованием ансамбля моделей машинного обучения.',
    technologies: ['Python', 'pandas', 'scikit-learn', 'catboost', 'matplotlib', 'Excel'],
    status: 'Завершен',
    details: [
      'Разработана система прогнозирования на основе ансамбля моделей машинного обучения',
      'Реализована обработка исторических данных и новых поступающих данных',
      'Создан механизм генерации прогноза на 52 недели вперед',
      'Автоматизирована установка и запуск проекта через batch-скрипты',
      'Добавлено подробное логирование и генерация отчетов',
      'Реализована автоматическая замена пропусков',
      'Проверка и автоустановка программ и библеотек необходимых для работы скрипта'
    ],
    results: [
      'Достигнут коэффициент детерминации R² = 0.9997',
      'Средняя абсолютная ошибка MAE < 0.74',
      'Создан полностью автоматизированный процесс развертывания, обучения и прогнозирования'
    ]
  },
  {
    id: 2,
    title: 'Анализ индекса счастья в Болгарии (2015-2023)',
    description: 'Исследование взаимосвязи между индексом счастья и различными социально-экономическими факторами в Болгарии.',
    technologies: ['Python', 'pandas', 'matplotlib', 'статистические методы анализа', 'Jupyter Notebook'],
    status: 'Завершен',
    details: [
      'Проведен корреляционный анализ между индексом счастья и различными показателями',
      'Построена множественная регрессионная модель',
      'Выполнен анализ временных рядов для выявления устойчивых тенденций',
      'Разработаны рекомендации'
    ],
    results: [
      'Выявлена сильная корреляция между политической стабильностью и индексом счастья',
      'Подтверждена взаимосвязь между ВВП на душу населения и индексом счастья',
      'Обнаружена значимая связь между социальной поддержкой и индексом счастья',
      'Предложены конкретные рекомендации по улучшению социально-экономической политики'
    ]
  },
  {
    id: 4,
    title: 'Прогнозирование банковских транзакций',
    description: 'Разработка системы прогнозирования еженедельных сумм переводов со счетов юридических лиц клиентов банка другим юридическим лицам с высокой точностью (RMSLE < 1,47).',
    technologies: ['Python', 'pandas', 'numpy', 'scikit-learn', 'LightGBM', 'CatBoost', 'временные ряды'],
    status: 'Завершен',
    details: [
      'Анализ и предобработка массивного набора данных (>200 млн транзакций)',
      'Разработка системы генерации признаков на основе банковских транзакций',
      'Построение ансамбля моделей машинного обучения для временных рядов',
      'Оптимизация алгоритмов для работы с большими объемами данных',
      'Создание метрик для валидации точности прогнозирования'
    ],
    results: [
      'Создана модель с метрикой RMSLE ниже 1,47 (усредненной по клиентам)',
      'Разработан алгоритм, способный обрабатывать данные по более чем 50 000 клиентов',
      'Реализована автоматизированная система прогнозирования с предсказанием на 12 недель вперед'
    ]
  },
  {
    id: 5,
    title: 'Система сквозной аналитики',
    description: 'Разработка структуры для масштабирования и интеграции различных источников данных.',
    technologies: ['Системный анализ', 'проектирование архитектуры'],
    status: 'В разработке',
    details: [
      'Создание полной структуры системы',
      'Планирование этапов масштабирования',
      'Разработка документации по внедрению'
    ]
  },
  {
    id: 8,
    title: 'Обработка и анализ текстовых данных',
    description: 'Разработка системы для анализа текстовых данных.',
    technologies: ['Python', 'обработка текстов'],
    status: 'Завершен',
    details: [
      'Реализация алгоритмов обработки текста',
      'Создание механизмов извлечения информации из текстовых документов',
      'Построение инструментов для аналитической работы с текстом'
    ]
  },
  {
    id: 12,
    title: 'Кредитный скоринг',
    description: 'Разработка модели оценки кредитоспособности клиентов на основе их персональных данных.',
    technologies: ['Python', 'pandas', 'scikit-learn', 'визуализация данных', 'машинное обучение'],
    status: 'Завершен',
    details: [
      'Проведен анализ параметров, влияющих на кредитоспособность клиентов',
      'Выполнена предобработка и очистка данных кредитной истории',
      'Построены и сравнены различные модели машинного обучения для прогнозирования',
      'Проведена оптимизация гиперпараметров моделей'
    ],
    results: [
      'Создана модель с высокой точностью предсказания кредитного риска',
      'Выявлены ключевые факторы, влияющие на кредитоспособность',
      'Разработан инструмент для автоматической оценки новых клиентов'
    ]
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [tiltedCard, setTiltedCard] = useState<number | null>(null);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleMouseMove = (e, id) => {
    if (tiltedCard !== id) return;
    
    // Получаем размеры и позицию карточки
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Вычисляем относительную позицию мыши внутри карточки
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Преобразуем в диапазон от -15 до 15 градусов
    const tiltX = -((y / rect.height) * 2 - 1) * 7;
    const tiltY = ((x / rect.width) * 2 - 1) * 7;
    
    setTiltValues({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = (id) => {
    setTiltedCard(id);
  };

  const handleMouseLeave = () => {
    setTiltedCard(null);
    setTiltValues({ x: 0, y: 0 });
  };

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

  return (
    <section id="projects" className="py-20" ref={ref}>
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Проекты
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Реализованные и текущие проекты в области Data Science, машинного обучения и анализа данных
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`bg-dark/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-secondary/50 transition-all duration-300 h-full flex flex-col group relative ${
                activeProject === project.id ? "ring-2 ring-secondary" : ""
              }`}
              style={{
                transform: tiltedCard === project.id 
                  ? `perspective(1000px) rotateX(${tiltValues.x}deg) rotateY(${tiltValues.y}deg) scale3d(1.02, 1.02, 1.02)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: 'transform 0.1s ease-out'
              }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 30px -10px rgba(100, 170, 255, 0.2)" 
              }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-xl z-[2]"></div>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl"></div>
              </div>

              {tiltedCard === project.id && (
                <div 
                  className="absolute inset-0 rounded-xl" 
                  style={{
                    background: 'linear-gradient(125deg, rgba(68, 136, 255, 0.08) 0%, rgba(0, 0, 0, 0) 60%)',
                    opacity: 0.6,
                    zIndex: 1
                  }}
                />
              )}

              <div className="p-6 flex-1 flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-secondary/90 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    project.status === 'Завершен' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-white/70 mb-6 flex-1 group-hover:text-white/90 transition-colors duration-300">
                  {project.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <motion.span 
                        key={index}
                        className="text-xs bg-primary/20 text-primary/90 px-2 py-1 rounded-md group-hover:bg-primary/30 transition-colors duration-300"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(68, 136, 255, 0.3)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <motion.span 
                        className="text-xs bg-secondary/20 text-secondary/90 px-2 py-1 rounded-md group-hover:bg-secondary/30 transition-colors duration-300"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(100, 170, 255, 0.3)" }}
                      >
                        +{project.technologies.length - 3}
                      </motion.span>
                    )}
                  </div>
                  
                  <motion.button
                    className={`text-sm font-medium text-white/70 hover:text-secondary flex items-center group transition-all duration-300 ${
                      activeProject === project.id ? "text-secondary" : ""
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeProject === project.id ? 'Скрыть детали' : 'Подробнее'}
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className={`ml-1 transition-transform duration-300 ${
                        activeProject === project.id ? "rotate-180" : ""
                      }`}
                    >
                      <path 
                        d="M19 9l-7 7-7-7" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
              
              <motion.div
                className="bg-dark/80 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeProject === project.id ? 'auto' : 0,
                  opacity: activeProject === project.id ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="p-6 pt-0">
                  {project.details && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white/90 mb-2">Описание:</h4>
                      <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
                        {project.details.map((detail, index) => (
                          <li key={index} className="ml-2 hover:text-white/90 transition-colors duration-200">{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {project.results && (
                    <div>
                      <h4 className="text-sm font-semibold text-white/90 mb-2">Результаты:</h4>
                      <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
                        {project.results.map((result, index) => (
                          <li key={index} className="ml-2 hover:text-white/90 transition-colors duration-200">{result}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects; 