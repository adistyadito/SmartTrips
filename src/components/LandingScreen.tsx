import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { MapPin, Calendar, DollarSign, Heart } from 'lucide-react';
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
    preferences: []
  });

  const preferences = [
    { id: 'food', label: 'Food & Cuisine', icon: '🍽️' },
    { id: 'culture', label: 'Culture & History', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure Sports', icon: '🏔️' },
    { id: 'family', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
    { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
    { id: 'nature', label: 'Nature & Wildlife', icon: '🌿' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'relaxation', label: 'Relaxation & Spa', icon: '🧘‍♀️' }
  ];

  const handlePreferenceChange = (preferenceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: checked 
        ? [...prev.preferences, preferenceId]
        : prev.preferences.filter(p => p !== preferenceId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.destination.trim()) {
      onGenerate(formData);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1534443274343-c6200874852c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHNjZW5pYyUyMHZpZXd8ZW58MXx8fHwxNzU4MjAzMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Travel destination"
          className="w-full h-64 object-cover"
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              AI Travel Architect
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl opacity-90"
            >
              Your Personal AI Travel Architect
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl text-gray-900 mb-2">Plan Your Perfect Trip</CardTitle>
              <p className="text-gray-600">Tell us about your dream destination and we'll create a personalized itinerary</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Destination Input */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="destination" className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    placeholder="Where would you like to go? (e.g., Paris, Tokyo, New York)"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    className="h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Duration Input */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="duration" className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Duration (days)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="30"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
                      className="h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </motion.div>

                  {/* Budget Input */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="budget" className="flex items-center gap-2 text-gray-700">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      Budget (IDR)
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      min="100"
                      step="100"
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) || 100 }))}
                      className="h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </motion.div>
                </div>

                {/* Preferences */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="space-y-4"
                >
                  <Label className="flex items-center gap-2 text-gray-700">
                    <Heart className="w-4 h-4 text-blue-600" />
                    Travel Preferences
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {preferences.map((preference, index) => (
                      <motion.div 
                        key={preference.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                        className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                        onClick={() => handlePreferenceChange(preference.id, !formData.preferences.includes(preference.id))}
                      >
                        <Checkbox
                          id={preference.id}
                          checked={formData.preferences.includes(preference.id)}
                          onCheckedChange={(checked) => handlePreferenceChange(preference.id, checked as boolean)}
                        />
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{preference.icon}</span>
                          <Label htmlFor={preference.id} className="text-sm cursor-pointer">
                            {preference.label}
                          </Label>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="pt-4"
                >
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Generate My Itinerary ✨
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}