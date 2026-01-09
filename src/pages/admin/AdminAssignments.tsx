import { useState } from "react";
import { Plus, Clock, FileText, Download, Upload, MoreHorizontal, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Assignment {
  id: number;
  title: string;
  submissionDeadline: string;
  status: "active" | "closed";
  assignmentPdfName: string | null;
  solutionPdfName: string | null;
  submissions: number;
  totalStudents: number;
}

const mockAssignments: Assignment[] = [
  { id: 1, title: "Array Operations", submissionDeadline: "Sep 15, 2025", status: "closed", assignmentPdfName: "assignment1.pdf", solutionPdfName: "assignment1_solution.pdf", submissions: 118, totalStudents: 120 },
  { id: 2, title: "List Implementations", submissionDeadline: "Oct 1, 2025", status: "closed", assignmentPdfName: "assignment2.pdf", solutionPdfName: "assignment2_solution.pdf", submissions: 115, totalStudents: 120 },
  { id: 3, title: "Heap Implementation", submissionDeadline: "Dec 28, 2025", status: "closed", assignmentPdfName: "assignment3.pdf", solutionPdfName: null, submissions: 98, totalStudents: 120 },
  { id: 4, title: "Graph Algorithms", submissionDeadline: "Jan 12, 2026", status: "active", assignmentPdfName: "assignment4.pdf", solutionPdfName: null, submissions: 45, totalStudents: 120 },
];

const AdminAssignments = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Assignments</h1>
            <p className="text-muted-foreground">Manage assignments and deadlines</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Add Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Add New Assignment</DialogTitle>
                <DialogDescription>
                  Create a new assignment with submission deadline.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input id="title" placeholder="e.g., Graph Algorithms" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Submission Deadline</Label>
                  <Input id="deadline" type="datetime-local" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Assignment PDF</Label>
                  <Input type="file" accept=".pdf" className="rounded-xl" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)} className="rounded-xl bg-primary">
                  Create Assignment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Assignments Grid */}
        <div className="space-y-4">
          {mockAssignments.map((assignment, index) => (
            <div
              key={assignment.id}
              className="p-5 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/20 text-secondary text-sm font-semibold">
                      {assignment.id}
                    </span>
                    <h3 className="font-semibold text-foreground">Assignment {assignment.id}: {assignment.title}</h3>
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                      assignment.status === "active" 
                        ? "bg-info/20 text-secondary" 
                        : "bg-success/20 text-foreground"
                    )}>
                      {assignment.status === "active" ? (
                        <>
                          <Clock className="h-3 w-3" />
                          Active
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          Closed
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Deadline: {assignment.submissionDeadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{assignment.submissions}/{assignment.totalStudents} submitted</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {assignment.assignmentPdfName ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{assignment.assignmentPdfName}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="rounded-lg gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Assignment PDF
                      </Button>
                    )}
                    
                    {assignment.solutionPdfName ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>{assignment.solutionPdfName}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="rounded-lg gap-2 border-dashed">
                        <Upload className="h-4 w-4" />
                        Upload Solution
                      </Button>
                    )}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem className="rounded-lg">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAssignments;
