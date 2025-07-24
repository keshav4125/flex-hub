import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, User, Mail, Phone, Star, Award } from "lucide-react";

const Trainers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - this will be replaced with Supabase data
  const trainers = [
    {
      id: 1,
      name: "Alex Smith",
      email: "alex@flexhub.com",
      phone: "+1 234 567 8900",
      specializations: ["CrossFit", "Strength Training"],
      rating: 4.9,
      clients: 25,
      experience: "5 years",
      status: "Available",
      certifications: ["ACSM", "NASM"],
    },
    {
      id: 2,
      name: "Emma Brown",
      email: "emma@flexhub.com",
      phone: "+1 234 567 8901",
      specializations: ["Yoga", "Pilates", "Meditation"],
      rating: 4.8,
      clients: 30,
      experience: "7 years",
      status: "Busy",
      certifications: ["RYT-500", "PMA"],
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@flexhub.com",
      phone: "+1 234 567 8902",
      specializations: ["HIIT", "Cardio", "Weight Loss"],
      rating: 4.7,
      clients: 20,
      experience: "3 years",
      status: "Available",
      certifications: ["ACE", "HIIT Certified"],
    },
  ];

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specializations.some(spec => 
      spec.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-gym-success text-white";
      case "Busy":
        return "bg-gym-secondary text-white";
      case "Offline":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trainers</h1>
          <p className="text-muted-foreground">Manage your certified fitness trainers</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Trainer
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card-gym">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search trainers by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <Card key={trainer.id} className="shadow-card-gym hover:shadow-gym transition-smooth">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{trainer.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{trainer.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({trainer.clients} clients)
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(trainer.status)}>
                  {trainer.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{trainer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{trainer.phone}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-1">
                  {trainer.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Certifications</h4>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gym-secondary" />
                  <span className="text-sm text-muted-foreground">
                    {trainer.certifications.join(", ")}
                  </span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Experience:</span> {trainer.experience}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Schedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTrainers.length === 0 && (
        <Card className="shadow-card-gym">
          <CardContent className="text-center py-8">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No trainers found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "Add your first trainer to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Trainers;