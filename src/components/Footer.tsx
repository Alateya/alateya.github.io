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
                    href="https://t.me/alateya_96" 
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-md"
          >
            <h4 className="text-2xl font-bold text-white mb-6">Связаться со мной</h4>
            
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary/20 backdrop-blur-sm rounded-lg p-6 border border-secondary/30"
              >
                <div className="flex items-center justify-center flex-col text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mb-4"
                  >
                    <FaPaperPlane className="text-2xl text-white" />
                  </motion.div>
                  <h5 className="text-xl font-bold text-white mb-2">Сообщение отправлено!</h5>
                  <p className="text-white/70">Спасибо за обращение. Я свяжусь с вами в ближайшее время.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white/80 mb-2 text-sm">Имя</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all duration-300"
                    placeholder="Ваше имя"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2 text-sm">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all duration-300"
                    placeholder="Ваш email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2 text-sm">Сообщение</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Ваше сообщение..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-secondary/20 border border-secondary/40 text-white rounded-lg py-3 font-medium relative overflow-hidden group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "tween", duration: 0.3 }}
                  />
                </motion.button>
                
                <p className="text-white/50 text-xs text-center mt-4">
                  Отправляя форму, вы соглашаетесь с <a href="/privacy-policy" className="text-secondary/80 hover:text-secondary transition-colors hover:underline">политикой обработки персональных данных</a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 