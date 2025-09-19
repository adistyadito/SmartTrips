import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, MapPin, Calendar, DollarSign, ExternalLink, Clock, Star } from 'lucide-react';

interface FormData {
  destination: string;
  duration: number;
  budget: number;
  preferences: string[];
}

interface Activity {
  time: string;
  title: string;
  description: string;
  cost: number;
  rating: number;
}

interface DayItinerary {
  day: number;
  title: string;
  activities: Activity[];
  totalCost: number;
}

interface ResultsScreenProps {
  formData: FormData;
  onBack: () => void;
}

export function ResultsScreen({ formData, onBack }: ResultsScreenProps) {
  // Generate mock itinerary data based on form inputs
  const generateItinerary = (): DayItinerary[] => {
    const activities = [
      { time: '9:00 AM', title: 'Historic City Center Tour', description: 'Explore the charming old town with a local guide', cost: 25, rating: 4.8 },
      { time: '11:30 AM', title: 'Local Market Visit', description: 'Sample fresh produce and local specialties', cost: 15, rating: 4.6 },
      { time: '1:00 PM', title: 'Traditional Lunch', description: 'Authentic local cuisine at a family-run restaurant', cost: 35, rating: 4.9 },
      { time: '3:00 PM', title: 'Museum & Art Gallery', description: 'Discover local history and contemporary art', cost: 18, rating: 4.7 },
      { time: '6:00 PM', title: 'Sunset Viewpoint', description: 'Panoramic views of the city at golden hour', cost: 0, rating: 4.9 },
      { time: '8:00 PM', title: 'Dinner & Cultural Show', description: 'Traditional performance with dinner', cost: 45, rating: 4.5 },
      { time: '10:00 AM', title: 'Adventure Activity', description: 'Hiking, biking, or water sports', cost: 60, rating: 4.8 },
      { time: '2:00 PM', title: 'Spa & Wellness', description: 'Relaxation and traditional treatments', cost: 80, rating: 4.7 },
      { time: '4:00 PM', title: 'Shopping District', description: 'Local crafts and souvenirs', cost: 50, rating: 4.4 },
      { time: '7:00 PM', title: 'Food Tour', description: 'Street food and local delicacies', cost: 40, rating: 4.8 }
    ];

    const itinerary: DayItinerary[] = [];
    const dailyBudget = formData.budget / formData.duration;
    
    for (let day = 1; day <= formData.duration; day++) {
      const dayActivities = activities
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 3);
      
      const totalCost = dayActivities.reduce((sum, activity) => sum + activity.cost, 0);
      
      itinerary.push({
        day,
        title: day === 1 ? 'Arrival & City Exploration' : 
               day === formData.duration ? 'Final Adventures & Departure' :
               `Day ${day} Highlights`,
        activities: dayActivities,
        totalCost
      });
    }
    
    return itinerary;
  };

  const itinerary = generateItinerary();
  const totalCost = itinerary.reduce((sum, day) => sum + day.totalCost, 0);

  const preferenceLabels: { [key: string]: string } = {
    food: 'Food & Cuisine',
    culture: 'Culture & History',
    adventure: 'Adventure Sports',
    family: 'Family Friendly',
    nightlife: 'Nightlife',
    nature: 'Nature & Wildlife',
    shopping: 'Shopping',
    relaxation: 'Relaxation & Spa'
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Personalized Itinerary</h1>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:bg-gradient-to-r dark:from-blue-700 dark:to-purple-800">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-blue-200" />
                  <div>
                    <p className="text-blue-100 text-sm">Destination</p>
                    <p className="text-xl font-semibold">{formData.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-blue-200" />
                  <div>
                    <p className="text-blue-100 text-sm">Duration</p>
                    <p className="text-xl font-semibold">{formData.duration} days</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-blue-200" />
                  <div>
                    <p className="text-blue-100 text-sm">Budget</p>
                    <p className="text-xl font-semibold">${formData.budget}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-blue-200" />
                  <div>
                    <p className="text-blue-100 text-sm">Est. Total Cost</p>
                    <p className="text-xl font-semibold">${totalCost}</p>
                  </div>
                </div>
              </div>
              
              {formData.preferences.length > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-400">
                  <p className="text-blue-100 text-sm mb-2">Your Preferences</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.preferences.map((pref) => (
                      <Badge key={pref} variant="secondary" className="bg-white/20 text-white border-white/30">
                        {preferenceLabels[pref]}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Itinerary Cards */}
        <div className="grid gap-6 mb-8">
          {itinerary.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="shadow-lg border-0 bg-white/90 dark:bg-[rgba(35,36,58,0.90)] backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-gray-900 dark:text-white mb-1">
                        Day {day.day}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-300">{day.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Daily Cost</p>
                      <p className="text-xl font-semibold text-green-600">${day.totalCost}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {day.activities.map((activity, activityIndex) => (
                      <motion.div
                        key={activityIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 + activityIndex * 0.05 }}
                        className="flex items-start gap-4 p-4 rounded-lg 
  bg-gray-50 hover:bg-gray-100 
  dark:bg-[rgba(255,255,255,0.04)] dark:hover:bg-[rgba(255,255,255,0.10)] 
  transition-colors"
                      >
                        <div className="flex items-center gap-2 text-blue-600 min-w-fit">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{activity.time}</span>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{activity.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{activity.description}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{activity.rating}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Cost: </span>
                              <span className="font-semibold text-green-600">
                                ${activity.cost === 0 ? 'Free' : activity.cost}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Book Now Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-lg border-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white dark:bg-gradient-to-r dark:from-green-700 dark:to-emerald-800">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Book Your Adventure?</h2>
              <p className="text-green-100 mb-6 text-lg">
                Your personalized itinerary is ready! Book flights and hotels to make it happen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 shadow-lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Book Flights
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-green-600 shadow-lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Book Hotels
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}