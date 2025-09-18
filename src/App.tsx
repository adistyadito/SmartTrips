import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { LandingScreen } from './components/LandingScreen';
import { ResultsScreen } from './components/ResultsScreen';

interface FormData {
  destination: string;
  duration: number;
  budget: number;
  preferences: string[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'results'>(
    'landing'
  );
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleGenerate = (data: FormData) => {
    setFormData(data);
    setCurrentScreen('results');
  };

  const handleBack = () => {
    setCurrentScreen('landing');
  };

  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <AnimatePresence mode='wait'>
          {currentScreen === 'landing' ? (
            <motion.div
              key='landing'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className='flex justify-center items-center'
            >
              <LandingScreen onGenerate={handleGenerate} />
            </motion.div>
          ) : (
            <motion.div
              key='results'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ResultsScreen formData={formData!} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      );
    }

    if (activeTab === 'trips') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center'
        >
          <div className='text-center'>
            <div className='w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center'>
              <span className='text-4xl'>✈️</span>
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>My Trips</h2>
            <p className='text-gray-600 text-lg'>
              Your saved itineraries will appear here
            </p>
            <p className='text-gray-500 mt-2'>
              Start planning your first trip to see it here!
            </p>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'about') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50'
        >
          <div className='max-w-4xl mx-auto px-4 py-16'>
            <div className='text-center mb-12'>
              <div className='w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center'>
                <span className='text-4xl'>🤖</span>
              </div>
              <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                About AI Travel Architect
              </h2>
              <p className='text-xl text-gray-600'>
                Revolutionizing travel planning with artificial intelligence
              </p>
            </div>

            <div className='grid md:grid-cols-2 gap-8 mb-12'>
              <div className='bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg'>
                <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                  🎯 Our Mission
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  We believe that everyone deserves the perfect vacation. Our
                  AI-powered platform creates personalized travel itineraries
                  that match your unique preferences, budget, and timeline.
                </p>
              </div>

              <div className='bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg'>
                <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                  ⚡ How It Works
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Simply tell us where you want to go, your budget, duration,
                  and preferences. Our AI analyzes millions of travel data
                  points to craft the perfect itinerary just for you.
                </p>
              </div>

              <div className='bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg'>
                <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                  🌟 Features
                </h3>
                <ul className='text-gray-600 space-y-2'>
                  <li>• Personalized recommendations</li>
                  <li>• Real-time budget tracking</li>
                  <li>• Local insights and hidden gems</li>
                  <li>• Seamless booking integration</li>
                </ul>
              </div>

              <div className='bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg'>
                <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                  🔒 Your Privacy
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Your data is safe with us. We use advanced encryption and
                  never share your personal information with third parties. Your
                  travel dreams are private and secure.
                </p>
              </div>
            </div>

            <div className='text-center'>
              <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                Ready to Start Planning?
              </h3>
              <button
                onClick={() => setActiveTab('home')}
                className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl'
              >
                Create Your Itinerary
              </button>
            </div>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className='min-h-screen bg-white'>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}
