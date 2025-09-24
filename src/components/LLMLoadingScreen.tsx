import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Brain, MapPin, Calendar, Sparkles, Clock, Globe, Route } from 'lucide-react';

interface LLMLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function LLMLoadingScreen({ isVisible, onComplete }: LLMLoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Memproses preferensi Anda...",
      subtitle: "AI sedang menganalisis pilihan perjalanan Anda",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Mencari destinasi terbaik...",
      subtitle: "Mengeksplorasi tempat-tempat menakjubkan di dunia",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Memetakan lokasi strategis...",
      subtitle: "Menemukan spot foto instagramable dan tersembunyi",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Menyusun jadwal perjalanan...",
      subtitle: "Mengoptimalkan waktu untuk pengalaman terbaik",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Route className="w-8 h-8" />,
      title: "Merancang rute efisien...",
      subtitle: "Menghitung jarak dan waktu tempuh optimal",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Finalisasi itinerary...",
      subtitle: "Menambahkan sentuhan akhir untuk perjalanan sempurna",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    const stepDuration = 2000; // 2 detik per step
    const totalSteps = loadingSteps.length;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        if (nextStep >= totalSteps) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 500);
          return totalSteps - 1;
        }
        return nextStep;
      });
    }, stepDuration);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (totalSteps * (stepDuration / 100));
        const newProgress = prev + increment;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const currentStepData = loadingSteps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Fixed size modal - w-96 (24rem/384px) and fixed height */}
          <Card className="w-96 h-[480px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-2xl flex flex-col">
            <CardContent className="p-8 flex flex-col justify-between h-full">
              {/* Top Section - Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className={`p-4 rounded-full bg-gradient-to-r ${currentStepData.color} text-white shadow-lg`}
                >
                  {currentStepData.icon}
                </motion.div>
              </div>

              {/* Middle Section - Text Content with fixed height */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Step Title - fixed height container */}
                <div className="h-16 flex items-center justify-center mb-4">
                  <motion.h3
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-bold text-center text-gray-900 dark:text-white leading-tight"
                  >
                    {currentStepData.title}
                  </motion.h3>
                </div>

                {/* Step Subtitle - fixed height container */}
                <div className="h-12 flex items-center justify-center mb-6">
                  <motion.p
                    key={`subtitle-${currentStep}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-gray-600 dark:text-gray-300 text-center leading-tight"
                  >
                    {currentStepData.subtitle}
                  </motion.p>
                </div>
              </div>

              {/* Bottom Section - Progress & Indicators */}
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className="h-2"
                  />
                </div>

                {/* Step Indicators */}
                <div className="flex justify-center space-x-2">
                  {loadingSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index <= currentStep 
                          ? 'bg-blue-500' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      animate={index === currentStep ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 0.5, repeat: index === currentStep ? Infinity : 0 }}
                    />
                  ))}
                </div>

                {/* Fun Loading Messages */}
                <motion.div
                  key={`fun-${currentStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="w-3 h-3" />
                    </motion.div>
                    <span>Powered by LLAMA AI</span>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}