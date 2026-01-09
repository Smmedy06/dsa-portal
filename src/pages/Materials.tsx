import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, Eye, Lock, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Material {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "completed" | "in_progress" | "upcoming" | "overdue";
  files: { name: string; type: string }[];
  solutionAvailable: boolean;
}

const labsData: Material[] = [
  { id: 1, title: "Lab 1: Introduction to Arrays", description: "Learn basic array operations and complexity analysis", dueDate: "Sep 5, 2025", status: "completed", files: [{ name: "lab1.pdf", type: "pdf" }, { name: "starter.cpp", type: "code" }], solutionAvailable: true },
  { id: 2, title: "Lab 2: Linked Lists", description: "Implement singly and doubly linked lists", dueDate: "Sep 12, 2025", status: "completed", files: [{ name: "lab2.pdf", type: "pdf" }], solutionAvailable: true },
  { id: 3, title: "Lab 3: Stacks & Queues", description: "Stack and queue implementations using arrays and linked lists", dueDate: "Sep 19, 2025", status: "completed", files: [{ name: "lab3.pdf", type: "pdf" }], solutionAvailable: true },
  { id: 4, title: "Lab 4: Recursion", description: "Recursive problem solving techniques", dueDate: "Sep 26, 2025", status: "completed", files: [{ name: "lab4.pdf", type: "pdf" }], solutionAvailable: true },
  { id: 5, title: "Lab 5: Trees Basics", description: "Binary tree traversals and operations", dueDate: "Oct 3, 2025", status: "completed", files: [{ name: "lab5.pdf", type: "pdf" }], solutionAvailable: true },
  { id: 6, title: "Lab 6: Binary Trees", description: "BST operations and balancing concepts", dueDate: "Oct 10, 2025", status: "completed", files: [{ name: "lab6.pdf", type: "pdf" }], solutionAvailable: true },
  { id: 7, title: "Lab 7: AVL Trees", description: "Self-balancing AVL tree implementation", dueDate: "Oct 17, 2025", status: "completed", files: [{ name: "lab7.pdf", type: "pdf" }], solutionAvailable: true },
  { id: 8, title: "Lab 8: Binary Search Trees", description: "Advanced BST operations", dueDate: "Jan 8, 2026", status: "completed", files: [{ name: "lab8.pdf", type: "pdf" }], solutionAvailable: false },
  { id: 9, title: "Lab 9: Hash Tables", description: "Hash table implementation with collision handling", dueDate: "Jan 15, 2026", status: "upcoming", files: [{ name: "lab9.pdf", type: "pdf" }], solutionAvailable: false },
];

const assignmentsData: Material[] = [
  { id: 1, title: "Assignment 1: Array Operations", description: "Implement various array algorithms", dueDate: "Sep 15, 2025", status: "completed", files: [{ name: "assignment1.pdf", type: "pdf" }], solutionAvailable: true },
  { id: 2, title: "Assignment 2: List Implementations", description: "Build a complete linked list library", dueDate: "Oct 1, 2025", status: "completed", files: [{ name: "assignment2.pdf", type: "pdf" }], solutionAvailable: true },
  { id: 3, title: "Assignment 3: Heap Implementation", description: "Min and max heap with heapsort", dueDate: "Dec 28, 2025", status: "overdue", files: [{ name: "assignment3.pdf", type: "pdf" }], solutionAvailable: false },
  { id: 4, title: "Assignment 4: Graph Algorithms", description: "BFS, DFS, and shortest path algorithms", dueDate: "Jan 12, 2026", status: "in_progress", files: [{ name: "assignment4.pdf", type: "pdf" }], solutionAvailable: false },
];

const statusConfig = {
  completed: { icon: CheckCircle2, label: "Completed", className: "bg-success/20 text-foreground" },
  in_progress: { icon: Clock, label: "In Progress", className: "bg-info/20 text-secondary" },
  upcoming: { icon: Clock, label: "Upcoming", className: "bg-muted text-muted-foreground" },
  overdue: { icon: Clock, label: "Overdue", className: "bg-destructive/20 text-destructive" },
};

const MaterialCard = ({ material }: { material: Material }) => {
  const status = statusConfig[material.status];
  const StatusIcon = status.icon;

  return (
    <div className="p-5 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-200">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{material.title}</h3>
            <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", status.className)}>
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{material.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Clock className="h-4 w-4" />
        <span>Due: {material.dueDate}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {material.files.map((file, i) => (
          <Button key={i} variant="outline" size="sm" className="rounded-xl gap-2">
            <FileText className="h-4 w-4" />
            {file.name}
            <Download className="h-3 w-3" />
          </Button>
        ))}
        
        {material.solutionAvailable ? (
          <Button variant="outline" size="sm" className="rounded-xl gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Eye className="h-4 w-4" />
            View Solution
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="rounded-xl gap-2" disabled>
            <Lock className="h-4 w-4" />
            Solution Locked
          </Button>
        )}
      </div>
    </div>
  );
};

const Materials = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Course Materials</h1>
          <p className="text-muted-foreground">Access labs, assignments, quizzes, and solutions</p>
        </div>

        <Tabs defaultValue="labs" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="labs" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Labs
            </TabsTrigger>
            <TabsTrigger value="assignments" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Assignments
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Quizzes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="labs" className="mt-4 space-y-4">
            {labsData.map((lab) => (
              <MaterialCard key={lab.id} material={lab} />
            ))}
          </TabsContent>

          <TabsContent value="assignments" className="mt-4 space-y-4">
            {assignmentsData.map((assignment) => (
              <MaterialCard key={assignment.id} material={assignment} />
            ))}
          </TabsContent>

          <TabsContent value="quizzes" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Quiz materials will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const HelpCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

export default Materials;
