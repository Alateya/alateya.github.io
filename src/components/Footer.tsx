'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTelegram, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Отправка формы с использованием Formspree
    fetch("https://formspree.io/f/mdkelpvp", {
      method: "POST",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert("Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.");
      }
      setIsSubmitting(false);
    })
    .catch(error => {
      console.error("Ошибка отправки:", error);
      alert("Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.");
      setIsSubmitting(false);
    });
  };
  
  // Анимация для социальных иконок
  const iconVariants = {
    hover: (custom) => ({
      y: -5,
      rotate: custom % 2 === 0 ? 15 : -15,
      color: 'rgb(100, 150, 255)',
      borderColor: 'rgba(100, 150, 255, 0.4)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    })
  };
  
  return (
    <footer id="contact" className="bg-dark/80 backdrop-blur-md py-16 border-t border-white/10 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-50">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full filter blur-[80px]"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full filter blur-[80px]"
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
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-0 md:max-w-md"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              EIS Portfolio
            </h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Портфолио Data Science специалиста с проектами в области анализа данных, машинного обучения и системной интеграции.
            </p>
            
            <p className="text-white/50 text-sm">
              &copy; {currentYear} EIS Portfolio. Все права защищены. <a href="/privacy-policy" className="text-secondary/70 hover:text-secondary transition-colors hover:underline">Политика конфиденциальности</a>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-auto max-w-md"
          >
            <h4 className="text-2xl font-bold text-white mb-6">Контакты</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1, color: 'rgb(100, 150, 255)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <FaEnvelope className="text-secondary/80 mr-3 text-xl" />
                  </motion.div>
                  <h5 className="text-lg font-medium text-white">Email</h5>
                </div>
                <a 
                  href="mailto:it.weiss@yandex.ru" 
                  className="text-white/70 hover:text-white transition-colors duration-300 hover:underline"
                >
                  it.weiss@yandex.ru
                </a>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <motion.div
                    whileHover={{ rotate: -15, scale: 1.1, color: 'rgb(100, 150, 255)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <FaPhone className="text-secondary/80 mr-3 text-xl" />
                  </motion.div>
                  <h5 className="text-lg font-medium text-white">Телефон</h5>
                </div>
                <a 
                  href="tel:+79636208777" 
                  className="text-white/70 hover:text-white transition-colors duration-300 hover:underline"
                >
                  +7 (963) 620-87-77
                </a>
              </div>
              
              <div className="col-span-1 md:col-span-2 mt-4">
                <div className="flex items-center mb-4">
                  <h5 className="text-lg font-medium text-white">Социальные сети</h5>
                </div>
                <div className="flex space-x-5">
                  <motion.a 
                    href="https://t.me/username" 
                    className="text-white/60 hover:text-secondary transition-all duration-300 p-2 border border-white/10 rounded-lg hover:border-secondary/40"
                    aria-label="Telegram"
                    variants={iconVariants}
                    custom={1}
                    whileHover="hover"
                  >
                    <FaTelegram className="text-xl" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 