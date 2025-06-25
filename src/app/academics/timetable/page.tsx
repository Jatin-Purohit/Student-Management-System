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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Download, Edit, Plus } from "lucide-react";

const timetableData = {
  "Class 10-A": {
    Monday: [
      {
        period: 1,
        time: "9:00-9:45",
        subject: "Mathematics",
        teacher: "Dr. Rajesh Kumar",
      },
      {
        period: 2,
        time: "9:45-10:30",
        subject: "English",
        teacher: "Mrs. Sunita Sharma",
      },
      {
        period: 3,
        time: "10:30-11:15",
        subject: "Science",
        teacher: "Mr. Vikram Singh",
      },
      {
        period: 4,
        time: "11:30-12:15",
        subject: "Social Studies",
        teacher: "Ms. Priya Patel",
      },
      {
        period: 5,
        time: "12:15-1:00",
        subject: "Hindi",
        teacher: "Mr. Amit Gupta",
      },
      {
        period: 6,
        time: "2:00-2:45",
        subject: "Physical Education",
        teacher: "Mr. Rohit Sharma",
      },
    ],
    Tuesday: [
      {
        period: 1,
        time: "9:00-9:45",
        subject: "Science",
        teacher: "Mr. Vikram Singh",
      },
      {
        period: 2,
        time: "9:45-10:30",
        subject: "Mathematics",
        teacher: "Dr. Rajesh Kumar",
      },
      {
        period: 3,
        time: "10:30-11:15",
        subject: "English",
        teacher: "Mrs. Sunita Sharma",
      },
      {
        period: 4,
        time: "11:30-12:15",
        subject: "Hindi",
        teacher: "Mr. Amit Gupta",
      },
      {
        period: 5,
        time: "12:15-1:00",
        subject: "Social Studies",
        teacher: "Ms. Priya Patel",
      },
      {
        period: 6,
        time: "2:00-2:45",
        subject: "Art & Craft",
        teacher: "Ms. Kavita Jain",
      },
    ],
    Wednesday: [
      {
        period: 1,
        time: "9:00-9:45",
        subject: "Mathematics",
        teacher: "Dr. Rajesh Kumar",
      },
      {
        period: 2,
        time: "9:45-10:30",
        subject: "Science",
        teacher: "Mr. Vikram Singh",
      },
      {
        period: 3,
        time: "10:30-11:15",
        subject: "Social Studies",
        teacher: "Ms. Priya Patel",
      },
      {
        period: 4,
        time: "11:30-12:15",
        subject: "English",
        teacher: "Mrs. Sunita Sharma",
      },
      {
        period: 5,
        time: "12:15-1:00",
        subject: "Computer Science",
        teacher: "Mr. Deepak Kumar",
      },
      {
        period: 6,
        time: "2:00-2:45",
        subject: "Music",
        teacher: "Ms. Ritu Singh",
      },
    ],
    Thursday: [
      {
        period: 1,
        time: "9:00-9:45",
        subject: "English",
        teacher: "Mrs. Sunita Sharma",
      },
      {
        period: 2,
        time: "9:45-10:30",
        subject: "Mathematics",
        teacher: "Dr. Rajesh Kumar",
      },
      {
        period: 3,
        time: "10:30-11:15",
        subject: "Hindi",
        teacher: "Mr. Amit Gupta",
      },
      {
        period: 4,
        time: "11:30-12:15",
        subject: "Science",
        teacher: "Mr. Vikram Singh",
      },
      {
        period: 5,
        time: "12:15-1:00",
        subject: "Social Studies",
        teacher: "Ms. Priya Patel",
      },
      {
        period: 6,
        time: "2:00-2:45",
        subject: "Library",
        teacher: "Ms. Meera Sharma",
      },
    ],
    Friday: [
      {
        period: 1,
        time: "9:00-9:45",
        subject: "Social Studies",
        teacher: "Ms. Priya Patel",
      },
      {
        period: 2,
        time: "9:45-10:30",
        subject: "Science",
        teacher: "Mr. Vikram Singh",
      },
      {
        period: 3,
        time: "10:30-11:15",
        subject: "Mathematics",
        teacher: "Dr. Rajesh Kumar",
      },
      {
        period: 4,
        time: "11:30-12:15",
        subject: "English",
        teacher: "Mrs. Sunita Sharma",
      },
      {
        period: 5,
        time: "12:15-1:00",
        subject: "Hindi",
        teacher: "Mr. Amit Gupta",
      },
      {
        period: 6,
        time: "2:00-2:45",
        subject: "Games",
        teacher: "Mr. Rohit Sharma",
      },
    ],
  },
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");

  const currentTimetable =
    timetableData[selectedClass as keyof typeof timetableData] ||
    timetableData["Class 10-A"];

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <h1 className="text-lg font-semibold">Timetable Management</h1>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Class 10-A">Class 10-A</SelectItem>
                <SelectItem value="Class 10-B">Class 10-B</SelectItem>
                <SelectItem value="Class 9-A">Class 9-A</SelectItem>
                <SelectItem value="Class 9-B">Class 9-B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Timetable
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate New
            </Button>
          </div>
        </div>

        {/* Timetable */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Timetable - {selectedClass}</CardTitle>
            <CardDescription>
              Class schedule for the current academic session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Period</TableHead>
                    <TableHead className="w-[120px]">Time</TableHead>
                    {days.map((day) => (
                      <TableHead
                        key={day}
                        className="text-center min-w-[150px]"
                      >
                        {day}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5, 6].map((period) => (
                    <TableRow key={period}>
                      <TableCell className="font-medium">
                        {period === 4 ? (
                          <Badge variant="secondary">Break</Badge>
                        ) : period === 6 ? (
                          <Badge variant="outline">Activity</Badge>
                        ) : (
                          `Period ${period}`
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {period === 4
                          ? "11:15-11:30"
                          : period === 6
                          ? "1:00-2:00"
                          : currentTimetable.Monday.find(
                              (p) => p.period === period
                            )?.time}
                      </TableCell>
                      {days.map((day) => {
                        if (period === 4) {
                          return (
                            <TableCell key={day} className="text-center">
                              <Badge variant="secondary">Lunch Break</Badge>
                            </TableCell>
                          );
                        }
                        const daySchedule =
                          currentTimetable[
                            day as keyof typeof currentTimetable
                          ];
                        const periodData = daySchedule?.find(
                          (p) => p.period === period
                        );
                        return (
                          <TableCell key={day} className="text-center">
                            {periodData ? (
                              <div className="space-y-1">
                                <div className="font-medium text-sm">
                                  {periodData.subject}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {periodData.teacher}
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">30</div>
              <p className="text-xs text-muted-foreground">Periods per week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Subjects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Teachers assigned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                Minutes per period
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
