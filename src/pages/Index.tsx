import { TrendingUp, BookOpen, FileText, HelpCircle, Award } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import GradeDonutChart from "@/components/dashboard/GradeDonutChart";
import CategoryBarChart from "@/components/dashboard/CategoryBarChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";

// Mock data - will be replaced with real data from Google Sheets
const mockStats = {
  overall: 82,
  labs: { score: 85, total: 100 },
  assignments: { score: 78, total: 100 },
  quizzes: { score: 88, total: 100 },
  exams: { score: 75, total: 100 },
};

const categoryData = [
  { name: "Labs", score: 85, total: 100 },
  { name: "Assignments", score: 78, total: 100 },
  { name: "Quizzes", score: 88, total: 100 },
  { name: "Exams", score: 75, total: 100 },
];

const recentActivities = [
  { id: "1", type: "lab" as const, title: "Lab 8: Binary Search Trees", status: "completed" as const, date: "Jan 8, 2026", score: 18, total: 20 },
  { id: "2", type: "assignment" as const, title: "Assignment 4: Graph Algorithms", status: "in_progress" as const, date: "Due Jan 12, 2026" },
  { id: "3", type: "quiz" as const, title: "Quiz 6: Sorting Algorithms", status: "completed" as const, date: "Jan 5, 2026", score: 9, total: 10 },
  { id: "4", type: "lab" as const, title: "Lab 7: AVL Trees", status: "completed" as const, date: "Jan 1, 2026", score: 17, total: 20 },
  { id: "5", type: "assignment" as const, title: "Assignment 3: Heap Implementation", status: "missing" as const, date: "Dec 28, 2025" },
];

const upcomingDeadlines = [
  { id: "1", title: "Assignment 4: Graph Algorithms", type: "assignment" as const, dueDate: "Jan 12, 2026", daysLeft: 3 },
  { id: "2", title: "Lab 9: Hash Tables", type: "lab" as const, dueDate: "Jan 15, 2026", daysLeft: 6 },
  { id: "3", title: "Quiz 7: Trees & Graphs", type: "quiz" as const, dueDate: "Jan 18, 2026", daysLeft: 9 },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Welcome back!
          </h1>
          <p className="text-muted-foreground">
            Here's your performance overview for Data Structures & Algorithms
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <StatCard
            title="Labs"
            value={`${mockStats.labs.score}%`}
            subtitle="8 of 10 completed"
            icon={<BookOpen className="h-5 w-5 text-primary-foreground" />}
            variant="primary"
          />
          <StatCard
            title="Assignments"
            value={`${mockStats.assignments.score}%`}
            subtitle="3 of 5 submitted"
            icon={<FileText className="h-5 w-5 text-muted-foreground" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Quizzes"
            value={`${mockStats.quizzes.score}%`}
            subtitle="6 of 8 taken"
            icon={<HelpCircle className="h-5 w-5 text-secondary-foreground" />}
            variant="secondary"
          />
          <StatCard
            title="Class Rank"
            value="#12"
            subtitle="of 120 students"
            icon={<Award className="h-5 w-5 text-muted-foreground" />}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Overall Grade Donut */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Overall Grade</h2>
            <div className="flex justify-center">
              <GradeDonutChart percentage={mockStats.overall} size="lg" />
            </div>
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 text-foreground text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                Grade: B+
              </span>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Performance by Category</h2>
            <CategoryBarChart data={categoryData} />
            <div className="flex flex-wrap gap-3 mt-4">
              {categoryData.map((cat, i) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: `hsl(var(--chart-${i + 1}))` }} 
                  />
                  <span className="text-sm text-muted-foreground">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity & Deadlines Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <ActivityFeed activities={recentActivities.slice(0, 4)} />
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h2>
              <button className="text-sm text-primary hover:underline">View Calendar</button>
            </div>
            <UpcomingDeadlines deadlines={upcomingDeadlines} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
