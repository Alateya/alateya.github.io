'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Background3D from '@/components/Background3D';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Achievements from '@/components/Achievements';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  useEffect(() => {
    // Добавляем плавную прокрутку для всех внутренних ссылок
    const handleSmoothScroll = (e) => {
      const target = e.target;
      
      // Проверяем, является ли элемент внутренней ссылкой
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };
    
    // Добавляем обработчик событий ко всему документу
    document.addEventListener('click', handleSmoothScroll);
    
    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <Background3D />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Header />
        <Hero />
        <Projects />
        <Skills />
        <Achievements />
        <Footer />
        <ScrollToTop />
      </motion.div>
    </main>
  );
} 