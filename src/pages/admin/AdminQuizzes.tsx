import { useState } from "react";
import { Plus, Calendar, FileText, Download, Upload, MoreHorizontal, Pencil, Trash2, Clock } from "lucide-react";
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

interface Quiz {
  id: number;
  title: string;
  scheduledDate: string;
  status: "completed" | "upcoming";
  quizPdfName: string | null;
  solutionPdfName: string | null;
}

const mockQuizzes: Quiz[] = [
  { id: 1, title: "Arrays & Complexity", scheduledDate: "Sep 10, 2025", status: "completed", quizPdfName: "quiz1.pdf", solutionPdfName: "quiz1_solution.pdf" },
  { id: 2, title: "Linked Lists", scheduledDate: "Sep 24, 2025", status: "completed", quizPdfName: "quiz2.pdf", solutionPdfName: "quiz2_solution.pdf" },
  { id: 3, title: "Stacks & Queues", scheduledDate: "Oct 8, 2025", status: "completed", quizPdfName: "quiz3.pdf", solutionPdfName: "quiz3_solution.pdf" },
  { id: 4, title: "Trees", scheduledDate: "Oct 22, 2025", status: "completed", quizPdfName: "quiz4.pdf", solutionPdfName: "quiz4_solution.pdf" },
  { id: 5, title: "Sorting Algorithms", scheduledDate: "Jan 5, 2026", status: "completed", quizPdfName: "quiz5.pdf", solutionPdfName: null },
  { id: 6, title: "Trees & Graphs", scheduledDate: "Jan 18, 2026", status: "upcoming", quizPdfName: null, solutionPdfName: null },
];

const AdminQuizzes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Quizzes</h1>
            <p className="text-muted-foreground">Manage quizzes and solutions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Add Quiz
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Add New Quiz</DialogTitle>
                <DialogDescription>
                  Schedule a new quiz for the course.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input id="title" placeholder="e.g., Graph Algorithms" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Scheduled Date</Label>
                  <Input id="date" type="date" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Quiz PDF (Optional - upload after quiz)</Label>
                  <Input type="file" accept=".pdf" className="rounded-xl" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)} className="rounded-xl bg-primary">
                  Create Quiz
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quizzes Grid */}
        <div className="space-y-4">
          {mockQuizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className="p-5 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-info/20 text-secondary text-sm font-semibold">
                      {quiz.id}
                    </span>
                    <h3 className="font-semibold text-foreground">Quiz {quiz.id}: {quiz.title}</h3>
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                      quiz.status === "upcoming" 
                        ? "bg-info/20 text-secondary" 
                        : "bg-success/20 text-foreground"
                    )}>
                      {quiz.status === "upcoming" ? (
                        <>
                          <Clock className="h-3 w-3" />
                          Upcoming
                        </>
                      ) : (
                        "Completed"
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{quiz.status === "upcoming" ? "Scheduled:" : "Date:"} {quiz.scheduledDate}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quiz.quizPdfName ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{quiz.quizPdfName}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="rounded-lg gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Quiz PDF
                      </Button>
                    )}
                    
                    {quiz.solutionPdfName ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>{quiz.solutionPdfName}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-lg gap-2 border-dashed"
                        disabled={quiz.status === "upcoming"}
                      >
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

export default AdminQuizzes;
