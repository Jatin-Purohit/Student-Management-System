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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Search, Plus, Edit, Trash2, Download, Upload } from "lucide-react";

// Dummy student data
const studentsData = [
  {
    id: 1,
    name: "Rahul Kumar",
    aadhaar: "1234-5678-9012",
    class: "Class 10",
    section: "A",
    rollNo: "001",
    dob: "2008-05-15",
    gender: "Male",
    caste: "General",
    parentName: "Suresh Kumar",
    phone: "9876543210",
    attendance: 92,
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    aadhaar: "2345-6789-0123",
    class: "Class 10",
    section: "A",
    rollNo: "002",
    dob: "2008-08-22",
    gender: "Female",
    caste: "OBC",
    parentName: "Rajesh Sharma",
    phone: "9876543211",
    attendance: 88,
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Singh",
    aadhaar: "3456-7890-1234",
    class: "Class 9",
    section: "B",
    rollNo: "015",
    dob: "2009-03-10",
    gender: "Male",
    caste: "SC",
    parentName: "Vikram Singh",
    phone: "9876543212",
    attendance: 76,
    status: "At Risk",
  },
  {
    id: 4,
    name: "Sneha Patel",
    aadhaar: "4567-8901-2345",
    class: "Class 8",
    section: "A",
    rollNo: "008",
    dob: "2010-12-05",
    gender: "Female",
    caste: "General",
    parentName: "Mahesh Patel",
    phone: "9876543213",
    attendance: 95,
    status: "Active",
  },
  {
    id: 5,
    name: "Arjun Yadav",
    aadhaar: "5678-9012-3456",
    class: "Class 7",
    section: "C",
    rollNo: "022",
    dob: "2011-07-18",
    gender: "Male",
    caste: "OBC",
    parentName: "Ramesh Yadav",
    phone: "9876543214",
    attendance: 84,
    status: "Active",
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm) ||
      student.aadhaar.includes(searchTerm);
    const matchesClass =
      selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getStatusBadge = (status: string, attendance: number) => {
    if (status === "At Risk" || attendance < 80) {
      return <Badge variant="destructive">At Risk</Badge>;
    }
    return <Badge variant="default">Active</Badge>;
  };

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Students Management</h1>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
                <SelectItem value="Class 9">Class 9</SelectItem>
                <SelectItem value="Class 8">Class 8</SelectItem>
                <SelectItem value="Class 7">Class 7</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Upload
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter the student details below to add them to the system.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter full name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="aadhaar">Aadhaar Number</Label>
                      <Input id="aadhaar" placeholder="XXXX-XXXX-XXXX" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="class">Class</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="class-1">Class 1</SelectItem>
                          <SelectItem value="class-2">Class 2</SelectItem>
                          <SelectItem value="class-3">Class 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="section">Section</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a">A</SelectItem>
                          <SelectItem value="b">B</SelectItem>
                          <SelectItem value="c">C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rollno">Roll Number</Label>
                      <Input id="rollno" placeholder="001" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="parent">Parent/Guardian Name</Label>
                      <Input id="parent" placeholder="Enter parent name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="9876543210" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Add Student
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Students ({filteredStudents.length})</CardTitle>
            <CardDescription>
              Manage student records and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Parent/Guardian</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {student.rollNo}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.aadhaar}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {student.class} - {student.section}
                      </TableCell>
                      <TableCell>{student.parentName}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span
                            className={
                              student.attendance < 80
                                ? "text-red-600"
                                : "text-green-600"
                            }
                          >
                            {student.attendance}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(student.status, student.attendance)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
