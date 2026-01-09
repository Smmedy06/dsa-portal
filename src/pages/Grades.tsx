import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradeDonutChart from "@/components/dashboard/GradeDonutChart";
import { BookOpen, FileText, HelpCircle, GraduationCap } from "lucide-react";

const gradeData = {
  labs: [
    { id: 1, title: "Lab 1: Introduction to Arrays", score: 18, total: 20, date: "Sep 5" },
    { id: 2, title: "Lab 2: Linked Lists", score: 19, total: 20, date: "Sep 12" },
    { id: 3, title: "Lab 3: Stacks & Queues", score: 17, total: 20, date: "Sep 19" },
    { id: 4, title: "Lab 4: Recursion", score: 20, total: 20, date: "Sep 26" },
    { id: 5, title: "Lab 5: Trees Basics", score: 16, total: 20, date: "Oct 3" },
    { id: 6, title: "Lab 6: Binary Trees", score: 18, total: 20, date: "Oct 10" },
    { id: 7, title: "Lab 7: AVL Trees", score: 17, total: 20, date: "Oct 17" },
    { id: 8, title: "Lab 8: Binary Search Trees", score: 18, total: 20, date: "Jan 8" },
  ],
  assignments: [
    { id: 1, title: "Assignment 1: Array Operations", score: 42, total: 50, date: "Sep 15" },
    { id: 2, title: "Assignment 2: List Implementations", score: 38, total: 50, date: "Oct 1" },
    { id: 3, title: "Assignment 3: Heap Implementation", score: null, total: 50, date: "Dec 28", missing: true },
  ],
  quizzes: [
    { id: 1, title: "Quiz 1: Arrays & Complexity", score: 8, total: 10, date: "Sep 8" },
    { id: 2, title: "Quiz 2: Linked Lists", score: 9, total: 10, date: "Sep 15" },
    { id: 3, title: "Quiz 3: Stacks & Queues", score: 10, total: 10, date: "Sep 22" },
    { id: 4, title: "Quiz 4: Recursion", score: 7, total: 10, date: "Oct 6" },
    { id: 5, title: "Quiz 5: Trees", score: 9, total: 10, date: "Oct 20" },
    { id: 6, title: "Quiz 6: Sorting Algorithms", score: 9, total: 10, date: "Jan 5" },
  ],
  exams: [
    { id: 1, title: "Midterm Exam", score: 72, total: 100, date: "Oct 25" },
  ],
};

const GradeCard = ({ item }: { item: any }) => {
  const percentage = item.score !== null ? Math.round((item.score / item.total) * 100) : null;
  
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-all">
      <GradeDonutChart 
        percentage={percentage ?? 0} 
        size="sm" 
        label="" 
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{item.title}</p>
        <p className="text-sm text-muted-foreground">{item.date}</p>
      </div>
      <div className="text-right">
        {item.missing ? (
          <span className="px-3 py-1 rounded-full bg-destructive/20 text-destructive text-sm font-medium">
            Missing
          </span>
        ) : (
          <>
            <p className="font-semibold text-foreground">
              {item.score}/{item.total}
            </p>
            <p className="text-sm text-muted-foreground">{percentage}%</p>
          </>
        )}
      </div>
    </div>
  );
};

const CategorySummary = ({ 
  icon: Icon, 
  title, 
  score, 
  total, 
  count 
}: { 
  icon: any; 
  title: string; 
  score: number; 
  total: number; 
  count: number;
}) => {
  const percentage = Math.round((score / total) * 100);
  
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
        <Icon className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{count} items</p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-foreground">{percentage}%</p>
        <p className="text-sm text-muted-foreground">{score}/{total}</p>
      </div>
    </div>
  );
};

const Grades = () => {
  const labsTotal = gradeData.labs.reduce((acc, l) => acc + (l.score || 0), 0);
  const labsMax = gradeData.labs.reduce((acc, l) => acc + l.total, 0);
  
  const assignmentsTotal = gradeData.assignments.reduce((acc, a) => acc + (a.score || 0), 0);
  const assignmentsMax = gradeData.assignments.filter(a => !a.missing).reduce((acc, a) => acc + a.total, 0);
  
  const quizzesTotal = gradeData.quizzes.reduce((acc, q) => acc + (q.score || 0), 0);
  const quizzesMax = gradeData.quizzes.reduce((acc, q) => acc + q.total, 0);
  
  const examsTotal = gradeData.exams.reduce((acc, e) => acc + (e.score || 0), 0);
  const examsMax = gradeData.exams.reduce((acc, e) => acc + e.total, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Grades</h1>
          <p className="text-muted-foreground">View your performance across all categories</p>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CategorySummary icon={BookOpen} title="Labs" score={labsTotal} total={labsMax} count={gradeData.labs.length} />
          <CategorySummary icon={FileText} title="Assignments" score={assignmentsTotal} total={assignmentsMax} count={gradeData.assignments.length} />
          <CategorySummary icon={HelpCircle} title="Quizzes" score={quizzesTotal} total={quizzesMax} count={gradeData.quizzes.length} />
          <CategorySummary icon={GraduationCap} title="Exams" score={examsTotal} total={examsMax} count={gradeData.exams.length} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="labs" className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="labs" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Labs ({gradeData.labs.length})
            </TabsTrigger>
            <TabsTrigger value="assignments" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Assignments ({gradeData.assignments.length})
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Quizzes ({gradeData.quizzes.length})
            </TabsTrigger>
            <TabsTrigger value="exams" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Exams ({gradeData.exams.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="labs" className="mt-4 space-y-3">
            {gradeData.labs.map((lab) => (
              <GradeCard key={lab.id} item={lab} />
            ))}
          </TabsContent>

          <TabsContent value="assignments" className="mt-4 space-y-3">
            {gradeData.assignments.map((assignment) => (
              <GradeCard key={assignment.id} item={assignment} />
            ))}
          </TabsContent>

          <TabsContent value="quizzes" className="mt-4 space-y-3">
            {gradeData.quizzes.map((quiz) => (
              <GradeCard key={quiz.id} item={quiz} />
            ))}
          </TabsContent>

          <TabsContent value="exams" className="mt-4 space-y-3">
            {gradeData.exams.map((exam) => (
              <GradeCard key={exam.id} item={exam} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Grades;
