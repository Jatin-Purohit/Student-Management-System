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
import { Library, Search, Plus, Edit, Trash2 } from "lucide-react";

const booksData = [
  {
    id: 1,
    title: "Mathematics for Class 10",
    author: "R.D. Sharma",
    isbn: "978-81-219-0123-4",
    category: "Textbook",
    subject: "Mathematics",
    class: "Class 10",
    publisher: "Dhanpat Rai Publications",
    totalCopies: 50,
    availableCopies: 35,
    issuedCopies: 15,
    status: "Available",
  },
  {
    id: 2,
    title: "English Grammar & Composition",
    author: "Wren & Martin",
    isbn: "978-81-219-0456-7",
    category: "Textbook",
    subject: "English",
    class: "Class 9",
    publisher: "S. Chand Publishing",
    totalCopies: 40,
    availableCopies: 28,
    issuedCopies: 12,
    status: "Available",
  },
  {
    id: 3,
    title: "Science for Class 8",
    author: "Lakhmir Singh",
    isbn: "978-81-219-0789-1",
    category: "Textbook",
    subject: "Science",
    class: "Class 8",
    publisher: "S. Chand Publishing",
    totalCopies: 45,
    availableCopies: 0,
    issuedCopies: 45,
    status: "Out of Stock",
  },
  {
    id: 4,
    title: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    isbn: "978-81-219-1234-5",
    category: "Fiction",
    subject: "Literature",
    class: "General",
    publisher: "Penguin Classics",
    totalCopies: 20,
    availableCopies: 18,
    issuedCopies: 2,
    status: "Available",
  },
  {
    id: 5,
    title: "Indian History",
    author: "Bipan Chandra",
    isbn: "978-81-219-5678-9",
    category: "Reference",
    subject: "History",
    class: "Class 10",
    publisher: "Orient BlackSwan",
    totalCopies: 30,
    availableCopies: 25,
    issuedCopies: 5,
    status: "Available",
  },
];

export default function LibraryCatalogPage() {
  const [books, setBooks] = useState(booksData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm);
    const matchesCategory =
      filterCategory === "all" || book.category === filterCategory;
    const matchesClass = filterClass === "all" || book.class === filterClass;
    return matchesSearch && matchesCategory && matchesClass;
  });

  const getStatusBadge = (status: string, availableCopies: number) => {
    if (status === "Out of Stock" || availableCopies === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (availableCopies < 5) {
      return <Badge variant="secondary">Low Stock</Badge>;
    }
    return <Badge variant="default">Available</Badge>;
  };

  const totalBooks = books.reduce((sum, book) => sum + book.totalCopies, 0);
  const availableBooks = books.reduce(
    (sum, book) => sum + book.availableCopies,
    0
  );
  const issuedBooks = books.reduce((sum, book) => sum + book.issuedCopies, 0);

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <Library className="h-5 w-5" />
          <h1 className="text-lg font-semibold">Library Catalog</h1>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalBooks}</div>
              <p className="text-xs text-muted-foreground">Total Books</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {availableBooks}
              </div>
              <p className="text-xs text-muted-foreground">Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {issuedBooks}
              </div>
              <p className="text-xs text-muted-foreground">Issued</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{books.length}</div>
              <p className="text-xs text-muted-foreground">Unique Titles</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Textbook">Textbook</SelectItem>
                <SelectItem value="Fiction">Fiction</SelectItem>
                <SelectItem value="Reference">Reference</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
                <SelectItem value="Class 9">Class 9</SelectItem>
                <SelectItem value="Class 8">Class 8</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>
                  Enter the book details to add it to the library catalog.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Book Title</Label>
                    <Input id="title" placeholder="Enter book title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" placeholder="Enter author name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input id="isbn" placeholder="978-81-219-0123-4" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input id="publisher" placeholder="Enter publisher name" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="textbook">Textbook</SelectItem>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="reference">Reference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Mathematics" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="class">Class</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class-10">Class 10</SelectItem>
                        <SelectItem value="class-9">Class 9</SelectItem>
                        <SelectItem value="class-8">Class 8</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="copies">Number of Copies</Label>
                  <Input id="copies" type="number" placeholder="50" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                  Add Book
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Books Table */}
        <Card>
          <CardHeader>
            <CardTitle>Book Catalog ({filteredBooks.length} books)</CardTitle>
            <CardDescription>
              Manage library books and inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Details</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Class/Subject</TableHead>
                    <TableHead>Copies</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.map((book) => (
                    <TableRow key={book.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{book.title}</div>
                          <div className="text-sm text-muted-foreground">
                            by {book.author}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ISBN: {book.isbn}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{book.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{book.class}</div>
                          <div className="text-xs text-muted-foreground">
                            {book.subject}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-green-600">
                            Available: {book.availableCopies}
                          </div>
                          <div className="text-blue-600">
                            Issued: {book.issuedCopies}
                          </div>
                          <div className="text-muted-foreground">
                            Total: {book.totalCopies}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(book.status, book.availableCopies)}
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
