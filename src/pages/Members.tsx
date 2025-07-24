import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, User, Mail, Phone, Calendar } from "lucide-react";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - this will be replaced with Supabase data
  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      membershipType: "Premium",
      joinDate: "2024-01-15",
      status: "Active",
      lastCheckIn: "2024-01-22",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 234 567 8901",
      membershipType: "Standard",
      joinDate: "2023-12-01",
      status: "Active",
      lastCheckIn: "2024-01-21",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234 567 8902",
      membershipType: "Basic",
      joinDate: "2024-01-10",
      status: "Inactive",
      lastCheckIn: "2024-01-18",
    },
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-gym-success text-white";
      case "Inactive":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getMembershipColor = (type: string) => {
    switch (type) {
      case "Premium":
        return "bg-gym-primary text-white";
      case "Standard":
        return "bg-gym-secondary text-white";
      case "Basic":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Members</h1>
          <p className="text-muted-foreground">Manage your gym members and memberships</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card-gym">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search members by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="shadow-card-gym hover:shadow-gym transition-smooth">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">ID: #{member.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{member.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{member.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined: {member.joinDate}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Badge className={getMembershipColor(member.membershipType)}>
                  {member.membershipType}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Last check-in: {member.lastCheckIn}
                </span>
              </div>
              <div className="flex space-x-2 pt-3">
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

      {filteredMembers.length === 0 && (
        <Card className="shadow-card-gym">
          <CardContent className="text-center py-8">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No members found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "Add your first member to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Members;