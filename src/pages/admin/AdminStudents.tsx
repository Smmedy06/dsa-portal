import { useState } from "react";
import { Search, Upload, Download, UserPlus, MoreHorizontal, Mail } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockStudents = [
  { id: 1, rollNumber: "BCSF23M001", name: "Ahmed Ali", email: "bcsf23m001@pucit.edu.pk", status: "active" },
  { id: 2, rollNumber: "BCSF23M002", name: "Sara Khan", email: "bcsf23m002@pucit.edu.pk", status: "active" },
  { id: 3, rollNumber: "BCSF23M003", name: "Usman Ahmed", email: "bcsf23m003@pucit.edu.pk", status: "active" },
  { id: 4, rollNumber: "BCSF23M004", name: "Fatima Zahra", email: "bcsf23m004@pucit.edu.pk", status: "active" },
  { id: 5, rollNumber: "BCSF23M005", name: "Hassan Raza", email: "bcsf23m005@pucit.edu.pk", status: "inactive" },
  { id: 6, rollNumber: "BCSF23M006", name: "Ayesha Malik", email: "bcsf23m006@pucit.edu.pk", status: "active" },
  { id: 7, rollNumber: "BCSF23M007", name: "Bilal Hussain", email: "bcsf23m007@pucit.edu.pk", status: "active" },
  { id: 8, rollNumber: "BCSF23M008", name: "Zainab Noor", email: "bcsf23m008@pucit.edu.pk", status: "active" },
];

const AdminStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Students</h1>
            <p className="text-muted-foreground">Manage enrolled students</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="rounded-xl gap-2">
              <Upload className="h-4 w-4" />
              Import CSV
            </Button>
            <Button className="rounded-xl gap-2 bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl bg-muted/50 border-0"
            />
          </div>
        </div>

        {/* Students Table */}
        <div 
          className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Roll Number</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">Email</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm">{student.rollNumber}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {student.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        student.status === "active"
                          ? "bg-success/20 text-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {student.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-lg">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem className="rounded-lg">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg text-destructive">
                          Remove Student
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No students found matching your search.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "300ms" }}>
          <p>Showing {filteredStudents.length} of {mockStudents.length} students</p>
          <p>{mockStudents.filter(s => s.status === "active").length} active students</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminStudents;
