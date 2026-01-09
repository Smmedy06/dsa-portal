import { useState } from "react";
import { Plus, Calendar, FileText, Download, Upload, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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

interface Lab {
  id: number;
  title: string;
  takenDate: string;
  labPdfName: string | null;
  solutionPdfName: string | null;
}

const mockLabs: Lab[] = [
  { id: 1, title: "Introduction to Arrays", takenDate: "Sep 5, 2025", labPdfName: "lab1.pdf", solutionPdfName: "lab1_solution.pdf" },
  { id: 2, title: "Linked Lists", takenDate: "Sep 12, 2025", labPdfName: "lab2.pdf", solutionPdfName: "lab2_solution.pdf" },
  { id: 3, title: "Stacks & Queues", takenDate: "Sep 19, 2025", labPdfName: "lab3.pdf", solutionPdfName: "lab3_solution.pdf" },
  { id: 4, title: "Recursion", takenDate: "Sep 26, 2025", labPdfName: "lab4.pdf", solutionPdfName: "lab4_solution.pdf" },
  { id: 5, title: "Trees Basics", takenDate: "Oct 3, 2025", labPdfName: "lab5.pdf", solutionPdfName: "lab5_solution.pdf" },
  { id: 6, title: "Binary Trees", takenDate: "Oct 10, 2025", labPdfName: "lab6.pdf", solutionPdfName: "lab6_solution.pdf" },
  { id: 7, title: "AVL Trees", takenDate: "Oct 17, 2025", labPdfName: "lab7.pdf", solutionPdfName: "lab7_solution.pdf" },
  { id: 8, title: "Binary Search Trees", takenDate: "Jan 8, 2026", labPdfName: "lab8.pdf", solutionPdfName: null },
];

const AdminLabs = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Labs</h1>
            <p className="text-muted-foreground">Manage lab materials and solutions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Add Lab
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Add New Lab</DialogTitle>
                <DialogDescription>
                  Create a new lab entry with materials.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lab Title</Label>
                  <Input id="title" placeholder="e.g., Hash Tables" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="takenDate">Taken Date</Label>
                  <Input id="takenDate" type="date" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Lab PDF</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" accept=".pdf" className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Solution PDF (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" accept=".pdf" className="rounded-xl" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)} className="rounded-xl bg-primary">
                  Create Lab
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Labs Grid */}
        <div className="space-y-4">
          {mockLabs.map((lab, index) => (
            <div
              key={lab.id}
              className="p-5 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary text-sm font-semibold">
                      {lab.id}
                    </span>
                    <h3 className="font-semibold text-foreground">Lab {lab.id}: {lab.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>Taken: {lab.takenDate}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lab.labPdfName ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{lab.labPdfName}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="rounded-lg gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Lab PDF
                      </Button>
                    )}
                    
                    {lab.solutionPdfName ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>{lab.solutionPdfName}</span>
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

export default AdminLabs;
