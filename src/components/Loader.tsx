'use client';
import { motion } from 'framer-motion';

const Loader = ({ isLoaded, onAnimationComplete }) => {
  const containerVariants = {
    initial: {
      opacity: 1
    },
    exit: {
      opacity: 0,
      transition: {
        delay: 0.5,
        duration: 0.5
      }
    }
  };

  const logoVariants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };

  const textVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const barVariants = {
    initial: {
      width: '0%'
    },
    animate: {
      width: '100%',
      transition: {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const dotsVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: [0, 1, 0],
      transition: {
        times: [0, 0.5, 1],
        repeat: Infinity,
        duration: 1.5,
        repeatDelay: 0
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark"
      variants={containerVariants}
      initial="initial"
      animate="initial"
      exit="exit"
      onAnimationComplete={onAnimationComplete}
    >
      <div className="flex flex-col items-center justify-center max-w-sm mx-auto text-center">
        <motion.div
          className="mb-8"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M7 10.2l4.5 4.5L17 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-secondary/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        <motion.h2
          className="text-xl font-semibold text-white mb-6"
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          EIS Portfolio
        </motion.h2>

        <div className="w-full max-w-xs mb-6">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              variants={barVariants}
              initial="initial"
              animate={isLoaded ? "animate" : "initial"}
            />
          </div>
        </div>
        
        <motion.div
          className="text-white/50 text-sm flex items-center"
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          Загрузка
          <motion.span variants={dotsVariants} initial="initial" animate="animate">.</motion.span>
          <motion.span variants={dotsVariants} initial="initial" animate="animate" style={{ animationDelay: '0.2s' }}>.</motion.span>
          <motion.span variants={dotsVariants} initial="initial" animate="animate" style={{ animationDelay: '0.4s' }}>.</motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader; 