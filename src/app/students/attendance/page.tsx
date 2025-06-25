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
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Save } from "lucide-react";

const attendanceData = [
  { id: 1, rollNo: "001", name: "Rahul Kumar", class: "10-A", present: true },
  { id: 2, rollNo: "002", name: "Priya Sharma", class: "10-A", present: true },
  { id: 3, rollNo: "003", name: "Amit Singh", class: "10-A", present: false },
  { id: 4, rollNo: "004", name: "Sneha Patel", class: "10-A", present: true },
  { id: 5, rollNo: "005", name: "Arjun Yadav", class: "10-A", present: true },
];

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [attendance, setAttendance] = useState(attendanceData);

  const toggleAttendance = (id: number) => {
    setAttendance((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const presentCount = attendance.filter((student) => student.present).length;
  const totalCount = attendance.length;
  const attendancePercentage = Math.round((presentCount / totalCount) * 100);

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          <h1 className="text-lg font-semibold">Student Attendance</h1>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6 animate-fade-in">
        <div className="grid gap-6 md:grid-cols-4">
          {/* Calendar */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Attendance Form */}
          <Card className="md:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Mark Attendance</CardTitle>
                  <CardDescription>
                    {selectedDate?.toLocaleDateString()} - {selectedClass}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10-A">Class 10-A</SelectItem>
                      <SelectItem value="10-B">Class 10-B</SelectItem>
                      <SelectItem value="9-A">Class 9-A</SelectItem>
                      <SelectItem value="9-B">Class 9-B</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Attendance
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Summary */}
              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600">
                      {presentCount}
                    </div>
                    <p className="text-xs text-muted-foreground">Present</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-red-600">
                      {totalCount - presentCount}
                    </div>
                    <p className="text-xs text-muted-foreground">Absent</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {attendancePercentage}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Attendance Rate
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Attendance Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No.</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead className="text-center">Present</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {student.rollNo}
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={student.present}
                            onCheckedChange={() => toggleAttendance(student.id)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              student.present ? "default" : "destructive"
                            }
                          >
                            {student.present ? "Present" : "Absent"}
                          </Badge>
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
    </div>
  );
}
