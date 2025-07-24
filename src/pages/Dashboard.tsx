import { Users, Dumbbell, Calendar, TrendingUp } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/gym-hero.jpg";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Members",
      value: "1,234",
      icon: Users,
      description: "Active memberships",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Active Trainers",
      value: "24",
      icon: Dumbbell,
      description: "Certified trainers",
      trend: { value: 2, isPositive: true },
    },
    {
      title: "Today's Sessions",
      value: "89",
      icon: Calendar,
      description: "Scheduled workouts",
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Monthly Revenue",
      value: "$45,230",
      icon: TrendingUp,
      description: "This month's earnings",
      trend: { value: 15, isPositive: true },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-hero rounded-xl overflow-hidden">
        <img
          src={heroImage}
          alt="Gym Interior"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to FlexHub</h1>
            <p className="text-xl opacity-90 mb-6">
              Your complete gym management solution
            </p>
            <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card-gym">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Recent Member Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "John Doe", action: "Checked in", time: "2 min ago" },
                { name: "Sarah Wilson", action: "Completed workout", time: "15 min ago" },
                { name: "Mike Johnson", action: "Renewed membership", time: "1 hour ago" },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-foreground">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card-gym">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Today's Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "09:00 AM", class: "CrossFit Beginners", trainer: "Alex Smith" },
                { time: "11:00 AM", class: "Yoga Flow", trainer: "Emma Brown" },
                { time: "02:00 PM", class: "HIIT Training", trainer: "Mike Davis" },
              ].map((session, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-foreground">{session.class}</p>
                    <p className="text-sm text-muted-foreground">with {session.trainer}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">{session.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;