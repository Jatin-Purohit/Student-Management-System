"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  UserCheck,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

const teachersData = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    employeeId: "EMP001",
    subject: "Mathematics",
    classes: ["Class 9", "Class 10"],
    phone: "9876543210",
    email: "rajesh.kumar@school.gov.in",
    qualification: "M.Sc, B.Ed",
    experience: "15 years",
    joiningDate: "2009-06-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Mrs. Sunita Sharma",
    employeeId: "EMP002",
    subject: "English",
    classes: ["Class 8", "Class 9"],
    phone: "9876543211",
    email: "sunita.sharma@school.gov.in",
    qualification: "M.A, B.Ed",
    experience: "12 years",
    joiningDate: "2012-04-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Mr. Vikram Singh",
    employeeId: "EMP003",
    subject: "Science",
    classes: ["Class 7", "Class 8"],
    phone: "9876543212",
    email: "vikram.singh@school.gov.in",
    qualification: "M.Sc, B.Ed",
    experience: "8 years",
    joiningDate: "2016-07-20",
    status: "Active",
  },
  {
    id: 4,
    name: "Ms. Priya Patel",
    employeeId: "EMP004",
    subject: "Social Studies",
    classes: ["Class 6", "Class 7"],
    phone: "9876543213",
    email: "priya.patel@school.gov.in",
    qualification: "M.A, B.Ed",
    experience: "6 years",
    joiningDate: "2018-08-15",
    status: "On Leave",
  },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(teachersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="default">Active</Badge>;
      case "On Leave":
        return <Badge variant="secondary">On Leave</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          <h1 className="text-lg font-semibold">Teachers & Staff</h1>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Enter the teacher details below to add them to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="empId">Employee ID</Label>
                    <Input id="empId" placeholder="EMP001" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="social">Social Studies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input id="qualification" placeholder="M.Sc, B.Ed" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="9876543210" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="teacher@school.gov.in"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="joiningDate">Joining Date</Label>
                  <Input id="joiningDate" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                  Add Teacher
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Teachers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={`/placeholder-user.jpg`}
                        alt={teacher.name}
                      />
                      <AvatarFallback>
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{teacher.name}</CardTitle>
                      <CardDescription>{teacher.employeeId}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(teacher.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Subject
                  </div>
                  <div className="text-sm">{teacher.subject}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Classes
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {teacher.classes.map((cls, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Joined:{" "}
                      {new Date(teacher.joiningDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm">
                    <span className="font-medium">{teacher.experience}</span>{" "}
                    experience
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{teachers.length}</div>
              <p className="text-xs text-muted-foreground">Total Teachers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {teachers.filter((t) => t.status === "Active").length}
              </div>
              <p className="text-xs text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {teachers.filter((t) => t.status === "On Leave").length}
              </div>
              <p className="text-xs text-muted-foreground">On Leave</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {Math.round(
                  teachers.reduce(
                    (acc, t) => acc + Number.parseInt(t.experience),
                    0
                  ) / teachers.length
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Avg. Experience (years)
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
