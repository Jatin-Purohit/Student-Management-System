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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MessageSquare,
  Send,
  Users,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

const recipientsData = [
  {
    id: 1,
    name: "Suresh Kumar",
    relation: "Father",
    student: "Rahul Kumar",
    class: "10-A",
    phone: "9876543210",
    email: "suresh@email.com",
    selected: false,
  },
  {
    id: 2,
    name: "Rajesh Sharma",
    relation: "Father",
    student: "Priya Sharma",
    class: "10-A",
    phone: "9876543211",
    email: "rajesh@email.com",
    selected: false,
  },
  {
    id: 3,
    name: "Vikram Singh",
    relation: "Father",
    student: "Amit Singh",
    class: "9-B",
    phone: "9876543212",
    email: "vikram@email.com",
    selected: false,
  },
  {
    id: 4,
    name: "Mahesh Patel",
    relation: "Father",
    student: "Sneha Patel",
    class: "8-A",
    phone: "9876543213",
    email: "mahesh@email.com",
    selected: false,
  },
  {
    id: 5,
    name: "Ramesh Yadav",
    relation: "Father",
    student: "Arjun Yadav",
    class: "7-C",
    phone: "9876543214",
    email: "ramesh@email.com",
    selected: false,
  },
];

const messageTemplates = [
  {
    id: 1,
    name: "Attendance Alert",
    content:
      "Dear Parent, Your child {student_name} was absent today. Please ensure regular attendance.",
  },
  {
    id: 2,
    name: "Exam Reminder",
    content:
      "Dear Parent, This is to remind you that {student_name}'s exam is scheduled on {date}. Please ensure proper preparation.",
  },
  {
    id: 3,
    name: "Fee Reminder",
    content:
      "Dear Parent, The school fee for {student_name} is due. Please pay at your earliest convenience.",
  },
  {
    id: 4,
    name: "Parent Meeting",
    content:
      "Dear Parent, You are invited to attend the parent-teacher meeting on {date} at {time}.",
  },
];

export default function MessagesPage() {
  const [recipients, setRecipients] = useState(recipientsData);
  const [messageType, setMessageType] = useState("sms");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [filterClass, setFilterClass] = useState("all");

  const toggleRecipient = (id: number) => {
    setRecipients((prev) =>
      prev.map((recipient) =>
        recipient.id === id
          ? { ...recipient, selected: !recipient.selected }
          : recipient
      )
    );
  };

  const selectAll = () => {
    const allSelected = recipients.every((r) => r.selected);
    setRecipients((prev) =>
      prev.map((recipient) => ({ ...recipient, selected: !allSelected }))
    );
  };

  const filteredRecipients = recipients.filter(
    (recipient) => filterClass === "all" || recipient.class === filterClass
  );

  const selectedCount = recipients.filter((r) => r.selected).length;

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find(
      (t) => t.id === Number.parseInt(templateId)
    );
    if (template) {
      setMessageContent(template.content);
      setSelectedTemplate(templateId);
    }
  };

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <h1 className="text-lg font-semibold">Send Messages</h1>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6 animate-fade-in">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Message Composition */}
          <Card>
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
              <CardDescription>
                Send SMS, WhatsApp, or Email to parents and students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Message Type */}
              <div className="space-y-2">
                <Label>Message Type</Label>
                <Select value={messageType} onValueChange={setMessageType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select message type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        SMS
                      </div>
                    </SelectItem>
                    <SelectItem value="whatsapp">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </div>
                    </SelectItem>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message Templates */}
              <div className="space-y-2">
                <Label>Quick Templates</Label>
                <Select
                  value={selectedTemplate}
                  onValueChange={handleTemplateSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTemplates.map((template) => (
                      <SelectItem
                        key={template.id}
                        value={template.id.toString()}
                      >
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject (for email) */}
              {messageType === "email" && (
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter email subject" />
                </div>
              )}

              {/* Message Content */}
              <div className="space-y-2">
                <Label htmlFor="message">Message Content</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={6}
                />
                <div className="text-sm text-muted-foreground">
                  Character count: {messageContent.length}
                  {messageType === "sms" && messageContent.length > 160 && (
                    <span className="text-yellow-600 ml-2">
                      (Multiple SMS will be sent)
                    </span>
                  )}
                </div>
              </div>

              {/* Send Button */}
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  {selectedCount} recipient(s) selected
                </div>
                <Button
                  disabled={selectedCount === 0 || !messageContent.trim()}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recipients Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Select Recipients</CardTitle>
                  <CardDescription>
                    Choose parents/guardians to send messages to
                  </CardDescription>
                </div>
                <Badge variant="outline">{selectedCount} selected</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="flex items-center gap-4">
                <Select value={filterClass} onValueChange={setFilterClass}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="10-A">Class 10-A</SelectItem>
                    <SelectItem value="9-B">Class 9-B</SelectItem>
                    <SelectItem value="8-A">Class 8-A</SelectItem>
                    <SelectItem value="7-C">Class 7-C</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={selectAll}>
                  <Users className="mr-2 h-4 w-4" />
                  {recipients.every((r) => r.selected)
                    ? "Deselect All"
                    : "Select All"}
                </Button>
              </div>

              {/* Recipients Table */}
              <div className="border rounded-md max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={recipients.every((r) => r.selected)}
                          onCheckedChange={selectAll}
                        />
                      </TableHead>
                      <TableHead>Parent/Guardian</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecipients.map((recipient) => (
                      <TableRow key={recipient.id}>
                        <TableCell>
                          <Checkbox
                            checked={recipient.selected}
                            onCheckedChange={() =>
                              toggleRecipient(recipient.id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{recipient.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {recipient.relation}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{recipient.student}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{recipient.class}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{recipient.phone}</div>
                            <div className="text-muted-foreground">
                              {recipient.email}
                            </div>
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

        {/* Message History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>History of sent messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Attendance Alert</div>
                    <div className="text-sm text-muted-foreground">
                      Sent to 25 parents • 2 hours ago
                    </div>
                  </div>
                </div>
                <Badge variant="default">Delivered</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Exam Reminder</div>
                    <div className="text-sm text-muted-foreground">
                      Sent to 45 parents • 1 day ago
                    </div>
                  </div>
                </div>
                <Badge variant="default">Delivered</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Parent Meeting Invitation</div>
                    <div className="text-sm text-muted-foreground">
                      Sent to 120 parents • 3 days ago
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
