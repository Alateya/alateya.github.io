'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Контейнер для модуля WebGL, который будет импортирован динамически
let WebGL: any = { isWebGLAvailable: () => true };

// Конфигурация для разных типов устройств
const DEVICE_CONFIGS = {
  DESKTOP: {
    starCount: 5000,
    gridSize: 40,
    starSize: 1,
    gridPointSize: 0.3,
    lineOpacity: 0.15
  },
  TABLET: {
    starCount: 4000,
    gridSize: 35,
    starSize: 1.2,
    gridPointSize: 0.35,
    lineOpacity: 0.12
  },
  MOBILE: {
    starCount: 3000,
    gridSize: 30,
    starSize: 1.4,
    gridPointSize: 0.4,
    lineOpacity: 0.1
  }
};

const Background3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [deviceType, setDeviceType] = useState('DESKTOP');
  const [isClient, setIsClient] = useState(false);

  // Определение типа устройства
  const detectDeviceType = () => {
    const width = window.innerWidth;
    if (width <= 768) return 'MOBILE';
    if (width <= 1024) return 'TABLET';
    return 'DESKTOP';
  };

  // Обработчик изменения размера окна
  const handleResize = () => {
    const newDeviceType = detectDeviceType();
    if (newDeviceType !== deviceType) {
      setDeviceType(newDeviceType);
    }

    if (rendererRef.current) {
      const dpr = Math.min(window.devicePixelRatio, 2);
      rendererRef.current.setPixelRatio(dpr);
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  };

  useEffect(() => {
    // Динамически импортируем WebGL только на клиенте
    async function loadWebGL() {
      try {
        const WebGLModule = await import('three/examples/jsm/capabilities/WebGL');
        WebGL = WebGLModule.default;
        setIsClient(true);
      } catch (error) {
        console.error('Failed to load WebGL module:', error);
      }
    }
    
    loadWebGL();
    
    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [deviceType]);

  useEffect(() => {
    if (!isClient || !containerRef.current || !WebGL.isWebGLAvailable()) return;

    try {
      const config = DEVICE_CONFIGS[deviceType];
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.fog = new THREE.Fog(0x000011, 100, 200);

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 50;

      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true
      });
      rendererRef.current = renderer;
      
      // Устанавливаем оптимальный DPR для текущего устройства
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      
      // Оптимизируем настройки рендерера
      renderer.info.autoReset = false;
      renderer.shadowMap.enabled = false;
      
      containerRef.current.appendChild(renderer.domElement);

      // Создаем звездное пространство
      const createStarfield = () => {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = config.starCount;
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        const starColors = new Float32Array(starCount * 3);
        const speeds = new Float32Array(starCount);
        const originalColors = new Float32Array(starCount * 3);

        for(let i = 0; i < starCount; i++) {
          const i3 = i * 3;
          positions[i3] = (Math.random() - 0.5) * window.innerWidth * 2;
          positions[i3 + 1] = (Math.random() - 0.5) * window.innerHeight * 2;
          positions[i3 + 2] = (Math.random() - 0.5) * 400 - 200;

          speeds[i] = Math.random() * 0.015 + 0.005;

          const rand = Math.random();
          if (rand < 0.75) {
            sizes[i] = 0.15 + Math.random() * 0.3;
          } else if (rand < 0.95) {
            sizes[i] = 0.4 + Math.random() * 0.6;
          } else {
            sizes[i] = 0.8 + Math.random() * 1.2;
          }

          const color = new THREE.Color();
          if (sizes[i] > 0.8) {
            color.setHSL(0.1 + Math.random() * 0.1, 0.8, 0.9);
          } else if (sizes[i] > 0.4) {
            color.setHSL(0.6 + Math.random() * 0.1, 0.6, 0.8);
          } else {
            color.setHSL(0.6 + Math.random() * 0.1, 0.3, 0.7);
          }
          
          originalColors[i3] = color.r;
          originalColors[i3 + 1] = color.g;
          originalColors[i3 + 2] = color.b;
          
          starColors[i3] = color.r;
          starColors[i3 + 1] = color.g;
          starColors[i3 + 2] = color.b;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        starGeometry.setAttribute('starColor', new THREE.BufferAttribute(starColors, 3));
        starGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
        starGeometry.userData = { originalColors };

        const starMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            deviceScale: { value: deviceType === 'MOBILE' ? 1.4 : deviceType === 'TABLET' ? 1.2 : 1.0 }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 starColor;
            varying vec3 vColor;
            uniform float time;
            uniform float pixelRatio;
            uniform float deviceScale;
            
            void main() {
              vColor = starColor;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * pixelRatio * deviceScale * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float r = distance(gl_PointCoord, vec2(0.5));
              if (r > 0.5) discard;
              float strength = 1.0 - (r * 2.0);
              gl_FragColor = vec4(vColor, strength);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          vertexColors: true
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        return stars;
      };

      const starfield = createStarfield();
      scene.add(starfield);

      // Создаем сетку точек с оптимизированным размером
      const gridSize = config.gridSize;
      const spacing = 2.8;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(gridSize * gridSize * 3);
      const colors = new Float32Array(gridSize * gridSize * 3);
      const originalY = new Float32Array(gridSize * gridSize);

      for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
          const index = (i * gridSize + j) * 3;
          positions[index] = (i - gridSize/2) * spacing;
          positions[index + 1] = 0;
          positions[index + 2] = (j - gridSize/2) * spacing;

          const color = new THREE.Color();
          color.setHSL(0.6, 0.8, 0.35);
          colors[index] = color.r;
          colors[index + 1] = color.g;
          colors[index + 2] = color.b;

          originalY[i * gridSize + j] = 0;
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: config.gridPointSize,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // Создаем линии между точками
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions: number[] = [];

      for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
          if (j < gridSize - 1) {
            linePositions.push(
              (i - gridSize/2) * spacing, 0, (j - gridSize/2) * spacing,
              (i - gridSize/2) * spacing, 0, ((j + 1) - gridSize/2) * spacing
            );
          }
          if (i < gridSize - 1) {
            linePositions.push(
              (i - gridSize/2) * spacing, 0, (j - gridSize/2) * spacing,
              ((i + 1) - gridSize/2) * spacing, 0, (j - gridSize/2) * spacing
            );
          }
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: config.lineOpacity,
        blending: THREE.AdditiveBlending
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);

      // Добавляем вертикальную линию с подсветкой
      const verticalLineGeometry = new THREE.BufferGeometry();
      const verticalLinePositions = new Float32Array([
        0, -50, 0,  // Начало линии
        0, 50, 0    // Конец линии
      ]);
      verticalLineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(verticalLinePositions, 3));
      
      const verticalLineMaterial = new THREE.LineBasicMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        linewidth: 2
      });

      const verticalLine = new THREE.Line(verticalLineGeometry, verticalLineMaterial);
      scene.add(verticalLine);

      // Создаем текстуру градиена программно
      const gradientCanvas = document.createElement('canvas');
      gradientCanvas.width = 64;
      gradientCanvas.height = 64;
      const ctx = gradientCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(200, 220, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const gradientTexture = new THREE.CanvasTexture(gradientCanvas);

      // Обновляем материалы с новой текстурой
      const verticalGlow = new THREE.SpriteMaterial({
        map: gradientTexture,
        color: 0x4488ff,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending
      });
      const verticalGlowSprite = new THREE.Sprite(verticalGlow);
      verticalGlowSprite.scale.set(2, 100, 1); // Делаем более узким для вертикальной линии
      scene.add(verticalGlowSprite);

      // Создаем текстуру для центрального градиента
      const centerGradientCanvas = document.createElement('canvas');
      centerGradientCanvas.width = 512;
      centerGradientCanvas.height = 512;
      const centerCtx = centerGradientCanvas.getContext('2d');
      if (centerCtx) {
        const gradient = centerCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
        gradient.addColorStop(0, 'rgba(160, 180, 255, 0.4)');  // Warmer core with slight purple tint
        gradient.addColorStop(0.3, 'rgba(120, 160, 255, 0.25)'); // Warmer middle
        gradient.addColorStop(0.7, 'rgba(100, 150, 255, 0.15)'); // Warmer extended fade
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        centerCtx.fillStyle = gradient;
        centerCtx.fillRect(0, 0, 512, 512);
      }
      const centerGradientTexture = new THREE.CanvasTexture(centerGradientCanvas);

      // Обновляем материал для центрального свечения
      const centerGlow = new THREE.SpriteMaterial({
        map: centerGradientTexture,
        transparent: true,
        opacity: 0.35, // Increased opacity
        blending: THREE.AdditiveBlending
      });
      const centerGlowSprite = new THREE.Sprite(centerGlow);
      centerGlowSprite.scale.set(80, 80, 1); // Reduced size from 120 to 80
      scene.add(centerGlowSprite);

      const handleMouseMove = (event: MouseEvent) => {
        mousePosition.current = {
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1,
        };
      };

      window.addEventListener('mousemove', handleMouseMove);

      let animationFrameId: number;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const time = Date.now() * 0.0005;

        // Анмация звезд
        const starPositions = starfield.geometry.attributes.position.array;
        const starSpeeds = starfield.geometry.attributes.speed.array;
        const starColors = starfield.geometry.attributes.starColor.array;
        const originalColors = starfield.geometry.userData.originalColors;
        
        for(let i = 0; i < starPositions.length; i += 3) {
          const speed = starSpeeds[i/3];
          starPositions[i + 2] += speed;
          
          // Мерцание зависит от размера звезды
          const starSize = starfield.geometry.attributes.size.array[i/3];
          const flickerSpeed = starSize > 0.8 ? 0.5 : 0.3; // Крупные звезды мерцают быстрее
          const flickerIntensity = starSize > 0.8 ? 0.2 : 0.15; // И более заметно
          const flicker = Math.sin(time * flickerSpeed + i) * flickerIntensity + 1;
          
          starColors[i] = originalColors[i] * flicker;
          starColors[i + 1] = originalColors[i + 1] * flicker;
          starColors[i + 2] = originalColors[i + 2] * flicker;
          
          if (starPositions[i + 2] > 50) {
            starPositions[i + 2] = -200;
            starPositions[i] = (Math.random() - 0.5) * window.innerWidth * 1.5;
            starPositions[i + 1] = (Math.random() - 0.5) * window.innerHeight * 1.5;
          }
        }
        
        starfield.geometry.attributes.position.needsUpdate = true;
        starfield.geometry.attributes.starColor.needsUpdate = true;
        (starfield.material as THREE.ShaderMaterial).uniforms.time.value = time;

        // Анимация сетки
        const positions = points.geometry.attributes.position.array;
        const linePositions = lines.geometry.attributes.position.array;

        // Анимация точек с оптимизацией
        for(let i = 0; i < gridSize; i++) {
          for(let j = 0; j < gridSize; j++) {
            const index = (i * gridSize + j) * 3;
            const x = positions[index];
            const z = positions[index + 2];

            const dx = x - mousePosition.current.x * 80;
            const dz = z - mousePosition.current.y * 80;
            const distance = Math.sqrt(dx * dx + dz * dz);

            const wave = Math.sin(distance * 0.2 - time * 1.5) * Math.exp(-distance * 0.08);
            positions[index + 1] = wave * 5;

            const colors = points.geometry.attributes.color.array;
            const intensity = Math.abs(wave) * 0.8;
            const color = new THREE.Color();
            color.setHSL(0.6 - intensity * 0.2, 0.8, 0.35 + intensity);
            colors[index] = color.r;
            colors[index + 1] = color.g;
            colors[index + 2] = color.b;
          }
        }

        points.geometry.attributes.position.needsUpdate = true;
        points.geometry.attributes.color.needsUpdate = true;

        // Обновляем линии
        let lineIndex = 0;
        for(let i = 0; i < gridSize; i++) {
          for(let j = 0; j < gridSize; j++) {
            const index = (i * gridSize + j) * 3;
            if (j < gridSize - 1) {
              linePositions[lineIndex] = positions[index];
              linePositions[lineIndex + 1] = positions[index + 1];
              linePositions[lineIndex + 2] = positions[index + 2];
              linePositions[lineIndex + 3] = positions[index + 3];
              linePositions[lineIndex + 4] = positions[index + 4];
              linePositions[lineIndex + 5] = positions[index + 5];
              lineIndex += 6;
            }
            if (i < gridSize - 1) {
              linePositions[lineIndex] = positions[index];
              linePositions[lineIndex + 1] = positions[index + 1];
              linePositions[lineIndex + 2] = positions[index + 2];
              const nextIndex = ((i + 1) * gridSize + j) * 3;
              linePositions[lineIndex + 3] = positions[nextIndex];
              linePositions[lineIndex + 4] = positions[nextIndex + 1];
              linePositions[lineIndex + 5] = positions[nextIndex + 2];
              lineIndex += 6;
            }
          }
        }

        lines.geometry.attributes.position.needsUpdate = true;

        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        renderer.info.reset();

        // Пульсация только для вертикальной линии
        const glowTime = Date.now() * 0.001;
        const glowPulse = Math.sin(glowTime * 0.5) * 0.05 + 0.1;
        verticalGlow.opacity = glowPulse;
        // centerGlow.opacity остается постоянным (0.15)
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        
        if (containerRef.current && rendererRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        
        if (sceneRef.current) {
          sceneRef.current.traverse((object) => {
            if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
              object.geometry.dispose();
              if (object.material instanceof THREE.Material) {
                object.material.dispose();
              } else if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              }
            }
          });
        }
        
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
      };
    } catch (error) {
      console.error('Error initializing Three.js:', error);
    }
  }, [deviceType, isClient]); // Перерендер при изменении типа устройства или загрузке клиента

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 1.5,
        ease: "easeOut"
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: '#000011',
      }}
    />
  );
};

export default Background3D; 