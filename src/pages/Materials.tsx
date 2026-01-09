import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, Lock, CheckCircle2, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Lab {
  id: number;
  title: string;
  takenDate: string;
  labPdfAvailable: boolean;
  solutionAvailable: boolean;
}

interface Assignment {
  id: number;
  title: string;
  submissionDeadline: string;
  status: "submitted" | "pending" | "overdue";
  assignmentPdfAvailable: boolean;
  solutionAvailable: boolean;
}

interface Quiz {
  id: number;
  title: string;
  takenDate: string;
  status: "completed" | "upcoming";
  quizPdfAvailable: boolean;
  solutionAvailable: boolean;
}

const labsData: Lab[] = [
  { id: 1, title: "Introduction to Arrays", takenDate: "Sep 5, 2025", labPdfAvailable: true, solutionAvailable: true },
  { id: 2, title: "Linked Lists", takenDate: "Sep 12, 2025", labPdfAvailable: true, solutionAvailable: true },
  { id: 3, title: "Stacks & Queues", takenDate: "Sep 19, 2025", labPdfAvailable: true, solutionAvailable: true },
  { id: 4, title: "Recursion", takenDate: "Sep 26, 2025", labPdfAvailable: true, solutionAvailable: true },
  { id: 5, title: "Trees Basics", takenDate: "Oct 3, 2025", labPdfAvailable: true, solutionAvailable: true },
  { id: 6, title: "Binary Trees", takenDate: "Oct 10, 2025", labPdfAvailable: true, solutionAvailable: true },
  { id: 7, title: "AVL Trees", takenDate: "Oct 17, 2025", labPdfAvailable: true, solutionAvailable: true },
  { id: 8, title: "Binary Search Trees", takenDate: "Jan 8, 2026", labPdfAvailable: true, solutionAvailable: false },
];

const assignmentsData: Assignment[] = [
  { id: 1, title: "Array Operations", submissionDeadline: "Sep 15, 2025", status: "submitted", assignmentPdfAvailable: true, solutionAvailable: true },
  { id: 2, title: "List Implementations", submissionDeadline: "Oct 1, 2025", status: "submitted", assignmentPdfAvailable: true, solutionAvailable: true },
  { id: 3, title: "Heap Implementation", submissionDeadline: "Dec 28, 2025", status: "overdue", assignmentPdfAvailable: true, solutionAvailable: false },
  { id: 4, title: "Graph Algorithms", submissionDeadline: "Jan 12, 2026", status: "pending", assignmentPdfAvailable: true, solutionAvailable: false },
];

const quizzesData: Quiz[] = [
  { id: 1, title: "Arrays & Complexity", takenDate: "Sep 10, 2025", status: "completed", quizPdfAvailable: true, solutionAvailable: true },
  { id: 2, title: "Linked Lists", takenDate: "Sep 24, 2025", status: "completed", quizPdfAvailable: true, solutionAvailable: true },
  { id: 3, title: "Stacks & Queues", takenDate: "Oct 8, 2025", status: "completed", quizPdfAvailable: true, solutionAvailable: true },
  { id: 4, title: "Trees", takenDate: "Oct 22, 2025", status: "completed", quizPdfAvailable: true, solutionAvailable: true },
  { id: 5, title: "Sorting Algorithms", takenDate: "Jan 5, 2026", status: "completed", quizPdfAvailable: true, solutionAvailable: false },
  { id: 6, title: "Trees & Graphs", takenDate: "Jan 18, 2026", status: "upcoming", quizPdfAvailable: false, solutionAvailable: false },
];

const LabCard = ({ lab }: { lab: Lab }) => {
  return (
    <div className="p-5 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-200">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">Lab {lab.id}: {lab.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Taken: {lab.takenDate}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {lab.labPdfAvailable ? (
          <Button variant="outline" size="sm" className="rounded-xl gap-2">
            <FileText className="h-4 w-4" />
            Lab PDF
            <Download className="h-3 w-3" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="rounded-xl gap-2" disabled>
            <FileText className="h-4 w-4" />
            Lab PDF
          </Button>
        )}
        
        {lab.solutionAvailable ? (
          <Button variant="outline" size="sm" className="rounded-xl gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <FileText className="h-4 w-4" />
            Solution
            <Download className="h-3 w-3" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="rounded-xl gap-2" disabled>
            <Lock className="h-4 w-4" />
            Solution
          </Button>
        )}
      </div>
    </div>
  );
};

const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
  const statusConfig = {
    submitted: { icon: CheckCircle2, label: "Submitted", className: "bg-success/20 text-foreground" },
    pending: { icon: Clock, label: "Pending", className: "bg-info/20 text-secondary" },
    overdue: { icon: Clock, label: "Overdue", className: "bg-destructive/20 text-destructive" },
  };
  
  const status = statusConfig[assignment.status];
  const StatusIcon = status.icon;

  return (
    <div className="p-5 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-200">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-foreground">Assignment {assignment.id}: {assignment.title}</h3>
            <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", status.className)}>
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Clock className="h-4 w-4" />
        <span>Deadline: {assignment.submissionDeadline}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {assignment.assignmentPdfAvailable ? (
          <Button variant="outline" size="sm" className="rounded-xl gap-2">
            <FileText className="h-4 w-4" />
            Assignment PDF
            <Download className="h-3 w-3" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="rounded-xl gap-2" disabled>
            <FileText className="h-4 w-4" />
            Assignment PDF
          </Button>
        )}
        
        {assignment.solutionAvailable ? (
          <Button variant="outline" size="sm" className="rounded-xl gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <FileText className="h-4 w-4" />
            Solution
            <Download className="h-3 w-3" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="rounded-xl gap-2" disabled>
            <Lock className="h-4 w-4" />
            Solution
          </Button>
        )}
      </div>
    </div>
  );
};

const QuizCard = ({ quiz }: { quiz: Quiz }) => {
  const isUpcoming = quiz.status === "upcoming";
  
  return (
    <div className="p-5 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-200">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-foreground">Quiz {quiz.id}: {quiz.title}</h3>
            {isUpcoming && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-info/20 text-secondary">
                <Clock className="h-3 w-3" />
                Upcoming
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Calendar className="h-4 w-4" />
        <span>{isUpcoming ? "Scheduled:" : "Taken:"} {quiz.takenDate}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {quiz.quizPdfAvailable ? (
          <Button variant="outline" size="sm" className="rounded-xl gap-2">
            <FileText className="h-4 w-4" />
            Quiz PDF
            <Download className="h-3 w-3" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="rounded-xl gap-2" disabled>
            <FileText className="h-4 w-4" />
            Quiz PDF
          </Button>
        )}
        
        {quiz.solutionAvailable ? (
          <Button variant="outline" size="sm" className="rounded-xl gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <FileText className="h-4 w-4" />
            Solution
            <Download className="h-3 w-3" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="rounded-xl gap-2" disabled>
            <Lock className="h-4 w-4" />
            Solution
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
              <LabCard key={lab.id} lab={lab} />
            ))}
          </TabsContent>

          <TabsContent value="assignments" className="mt-4 space-y-4">
            {assignmentsData.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </TabsContent>

          <TabsContent value="quizzes" className="mt-4 space-y-4">
            {quizzesData.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Materials;
