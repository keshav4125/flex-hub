import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Calendar, Clock, Users, Target, Zap, Heart } from "lucide-react";

const Workouts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - this will be replaced with Supabase data
  const workoutPlans = [
    {
      id: 1,
      name: "Morning CrossFit",
      description: "High-intensity functional fitness workout",
      duration: 45,
      difficulty: "Advanced",
      trainer: "Alex Smith",
      participants: 12,
      maxCapacity: 15,
      schedule: "Mon, Wed, Fri - 9:00 AM",
      category: "Strength",
      equipment: ["Barbells", "Kettlebells", "Pull-up Bar"],
    },
    {
      id: 2,
      name: "Yoga Flow",
      description: "Mindful movement and flexibility training",
      duration: 60,
      difficulty: "Beginner",
      trainer: "Emma Brown",
      participants: 8,
      maxCapacity: 20,
      schedule: "Daily - 11:00 AM",
      category: "Flexibility",
      equipment: ["Yoga Mats", "Blocks", "Straps"],
    },
    {
      id: 3,
      name: "HIIT Blast",
      description: "High-intensity interval training for fat burning",
      duration: 30,
      difficulty: "Intermediate",
      trainer: "Mike Davis",
      participants: 10,
      maxCapacity: 12,
      schedule: "Tue, Thu, Sat - 2:00 PM",
      category: "Cardio",
      equipment: ["Dumbbells", "Resistance Bands", "Medicine Balls"],
    },
  ];

  const workoutTemplates = [
    {
      id: 1,
      name: "Push Day",
      type: "Strength",
      exercises: ["Push-ups", "Bench Press", "Shoulder Press", "Tricep Dips"],
      duration: 60,
      targetMuscles: ["Chest", "Shoulders", "Triceps"],
    },
    {
      id: 2,
      name: "Cardio Blast",
      type: "Cardio",
      exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees"],
      duration: 30,
      targetMuscles: ["Full Body"],
    },
    {
      id: 3,
      name: "Core Crusher",
      type: "Core",
      exercises: ["Planks", "Russian Twists", "Bicycle Crunches", "Dead Bug"],
      duration: 20,
      targetMuscles: ["Core", "Abs"],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-gym-success text-white";
      case "Intermediate":
        return "bg-gym-secondary text-white";
      case "Advanced":
        return "bg-gym-primary text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Strength":
        return <Target className="w-4 h-4" />;
      case "Cardio":
        return <Heart className="w-4 h-4" />;
      case "Flexibility":
        return <Zap className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const filteredWorkouts = workoutPlans.filter(workout =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workouts</h1>
          <p className="text-muted-foreground">Manage workout plans, schedules, and templates</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Create Workout
        </Button>
      </div>

      {/* Search */}
      <Card className="shadow-card-gym">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search workouts by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="classes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="classes">Group Classes</TabsTrigger>
          <TabsTrigger value="templates">Workout Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => (
              <Card key={workout.id} className="shadow-card-gym hover:shadow-gym transition-smooth">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        {getCategoryIcon(workout.category)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{workout.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          with {workout.trainer}
                        </p>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(workout.difficulty)}>
                      {workout.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{workout.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{workout.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{workout.participants}/{workout.maxCapacity}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{workout.schedule}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Equipment</h4>
                    <div className="flex flex-wrap gap-1">
                      {workout.equipment.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutTemplates.map((template) => (
              <Card key={template.id} className="shadow-card-gym hover:shadow-gym transition-smooth">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        {getCategoryIcon(template.type)}
                      </div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">{template.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{template.duration} minutes</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Exercises</h4>
                    <div className="space-y-1">
                      {template.exercises.map((exercise, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {exercise}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Target Muscles</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.targetMuscles.map((muscle, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Use Template
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workouts;