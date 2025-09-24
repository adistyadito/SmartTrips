import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { MapPin, Calendar, DollarSign, Heart, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FormData {
  destination: string;
  duration: number;
  budget: number;
  preferences: string[];
}

interface LandingScreenProps {
  onGenerate: (formData: FormData) => void;
}

export function LandingScreen({ onGenerate }: LandingScreenProps) {
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    duration: 5,
    budget: 2000,
    preferences: [],
  });

  const [autoInput, setAutoInput] = useState('');
  const [mode, setMode] = useState<'manual' | 'auto'>('manual');

  const preferencesList = [
    { id: 'food', label: 'Food & Cuisine', icon: '🍽️' },
    { id: 'culture', label: 'Culture & History', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure Sports', icon: '🏔️' },
    { id: 'family', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
    { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
    { id: 'nature', label: 'Nature & Wildlife', icon: '🌿' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'relaxation', label: 'Relaxation & Spa', icon: '🧘‍♀️' },
  ];

  // Toggle preference
  const handlePreferenceChange = (preferenceId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferences: checked
        ? [...prev.preferences, preferenceId]
        : prev.preferences.filter((p) => p !== preferenceId),
    }));
  };

  // Simple parser untuk auto mode
  const parseAutoInput = (text: string) => {
    const durationMatch = text.match(/(\d+)\s*hari/i);
    const budgetMatch = text.match(/(\d+\.?\d*)\s*(juta|jt|ribu)/i);
    const destinationMatch = text.match(/ke\s([A-Za-z\s]+)/i);
    const prefs: string[] = [];
    if (/kuliner/i.test(text)) prefs.push('food');
    if (/budaya|history/i.test(text)) prefs.push('culture');
    if (/petualangan|adventure/i.test(text)) prefs.push('adventure');
    if (/keluarga|family/i.test(text)) prefs.push('family');
    if (/malam|nightlife/i.test(text)) prefs.push('nightlife');
    if (/alam|nature/i.test(text)) prefs.push('nature');
    if (/belanja|shopping/i.test(text)) prefs.push('shopping');
    if (/relax|spa/i.test(text)) prefs.push('relaxation');

    setFormData({
      destination: destinationMatch ? destinationMatch[1].trim() : '',
      duration: durationMatch ? parseInt(durationMatch[1]) : 1,
      budget: budgetMatch
        ? budgetMatch[2].toLowerCase().includes('juta')
          ? parseFloat(budgetMatch[1]) * 1000000
          : parseFloat(budgetMatch[1]) * 1000
        : 100000,
      preferences: prefs,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'auto' && autoInput.trim()) {
      parseAutoInput(autoInput);
    }
    onGenerate(formData);
  };

  return (
    <div className='min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-[#181926] dark:via-[#23243a] dark:to-[#23243a] transition-colors w-full'>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='relative overflow-hidden'
      >
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20'></div>
        <ImageWithFallback
          src='https://images.unsplash.com/photo-1534443274343-c6200874852c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
          alt='Travel destination'
          className='w-full h-64 object-cover'
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='text-4xl md:text-6xl font-bold mb-4'
            >
              AI Travel Architect
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className='text-xl md:text-2xl opacity-90'
            >
              Your Personal AI Travel Architect
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <div className='max-w-4xl mx-auto px-4 py-12'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className='shadow-2xl border-0 bg-white/90 dark:bg-[rgba(35,36,58,0.90)] backdrop-blur-sm'>
            <CardHeader className='text-center pb-8'>
              <CardTitle className='text-3xl text-gray-900 dark:text-white mb-2'>
                Plan Your Perfect Trip
              </CardTitle>
              <p className='text-gray-600 dark:text-gray-300'>
                {mode === 'manual'
                  ? "Tell us about your dream destination and we'll create a personalized itinerary"
                  : "Enter a single sentence describing your trip and budget, and we'll parse it automatically"}
              </p>
              <Button
                variant='outline'
                className='mt-4 flex items-center justify-center gap-2'
                onClick={() => setMode(mode === 'manual' ? 'auto' : 'manual')}
              >
                {mode === 'manual' ? (
                  <Zap className='w-4 h-4' />
                ) : (
                  <MapPin className='w-4 h-4' />
                )}
                Switch to {mode === 'manual' ? 'Auto Mode' : 'Manual Mode'}
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-8'>
                {mode === 'manual' ? (
                  <>
                    {/* Destination */}
                    <div className='space-y-2'>
                      <Label
                        htmlFor='destination'
                        className='flex items-center gap-2 text-gray-700 dark:text-gray-100'
                      >
                        <MapPin className='w-4 h-4 text-blue-600' /> Destination
                      </Label>
                      <Input
                        id='destination'
                        placeholder='Where would you like to go?'
                        value={formData.destination}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            destination: e.target.value,
                          }))
                        }
                        className='h-12 text-lg'
                        required
                      />
                    </div>
                    {/* Duration & Budget */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <Label
                          htmlFor='duration'
                          className='flex items-center gap-2 text-gray-700 dark:text-gray-100'
                        >
                          <Calendar className='w-4 h-4 text-blue-600' />{' '}
                          Duration (days)
                        </Label>
                        <Input
                          id='duration'
                          type='number'
                          min={1}
                          max={30}
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              duration: parseInt(e.target.value) || 1,
                            }))
                          }
                          className='h-12 text-lg'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label
                          htmlFor='budget'
                          className='flex items-center gap-2 text-gray-700 dark:text-gray-100'
                        >
                          <DollarSign className='w-4 h-4 text-blue-600' />{' '}
                          Budget (IDR)
                        </Label>
                        <Input
                          id='budget'
                          type='number'
                          min={100}
                          step={100}
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              budget: parseInt(e.target.value) || 100,
                            }))
                          }
                          className='h-12 text-lg'
                        />
                      </div>
                    </div>
                    {/* Preferences */}
                    <div className='space-y-4'>
                      <Label className='flex items-center gap-2 text-gray-700 dark:text-gray-100'>
                        <Heart className='w-4 h-4 text-blue-600' /> Travel
                        Preferences
                      </Label>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {preferencesList.map((pref) => {
                          const selected = formData.preferences.includes(
                            pref.id
                          );
                          return (
                            <div
                              key={pref.id}
                              className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                                selected
                                  ? 'bg-blue-100 border-blue-400'
                                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                              }`}
                              onClick={() =>
                                handlePreferenceChange(pref.id, !selected)
                              }
                            >
                              <span className='text-lg'>{pref.icon}</span>
                              <Label className='text-sm cursor-pointer ml-2'>
                                {pref.label}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  // Auto mode
                  <div className='space-y-2'>
                    <Label
                      htmlFor='autoInput'
                      className='flex items-center gap-2 text-gray-700 dark:text-gray-100'
                    >
                      <Zap className='w-4 h-4 text-blue-600' /> Describe your
                      trip
                    </Label>
                    <Input
                      id='autoInput'
                      placeholder='Example: "5 hari ke Jogja, budget 4 juta, suka kuliner & wisata budaya"'
                      value={autoInput}
                      onChange={(e) => setAutoInput(e.target.value)}
                      className='h-12 text-lg'
                    />
                  </div>
                )}

                <div className='pt-4'>
                  <Button
                    type='submit'
                    className='w-full h-14 text-lg bg-white text-blue-700 hover:bg-blue-50 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:text-white'
                  >
                    Generate My Itinerary ✨
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
