import { Users, BookOpen, FileText, HelpCircle, TrendingUp, Calendar } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import StatCard from "@/components/dashboard/StatCard";

const adminStats = [
  { title: "Total Students", value: "120", subtitle: "Enrolled this semester", icon: Users },
  { title: "Labs", value: "8", subtitle: "2 remaining", icon: BookOpen },
  { title: "Assignments", value: "4", subtitle: "1 pending submission", icon: FileText },
  { title: "Quizzes", value: "6", subtitle: "1 upcoming", icon: HelpCircle },
];

const recentUpdates = [
  { id: 1, action: "Uploaded", item: "Lab 8: Binary Search Trees", time: "2 hours ago" },
  { id: 2, action: "Added solution for", item: "Assignment 2", time: "1 day ago" },
  { id: 3, action: "Updated grades for", item: "Quiz 5", time: "2 days ago" },
  { id: 4, action: "Created", item: "Assignment 4: Graph Algorithms", time: "3 days ago" },
];

const upcomingSchedule = [
  { id: 1, title: "Lab 9: Hash Tables", type: "Lab", date: "Jan 15, 2026" },
  { id: 2, title: "Quiz 6: Trees & Graphs", type: "Quiz", date: "Jan 18, 2026" },
  { id: 3, title: "Assignment 4 Deadline", type: "Deadline", date: "Jan 12, 2026" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage course content and monitor student progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={<Icon className="h-5 w-5 text-muted-foreground" />}
                variant={index === 0 ? "primary" : "default"}
              />
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Updates */}
          <div 
            className="bg-card rounded-2xl border border-border p-6 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Recent Updates</h2>
            </div>

            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <div key={update.id} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="text-muted-foreground">{update.action}</span>{" "}
                      <span className="font-medium">{update.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div 
            className="bg-card rounded-2xl border border-border p-6 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Upcoming Schedule</h2>
            </div>

            <div className="space-y-3">
              {upcomingSchedule.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                  <span className="text-xs font-medium text-primary">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          className="bg-card rounded-2xl border border-border p-6 animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a 
              href="/admin/labs" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Add Lab</span>
            </a>
            <a 
              href="/admin/assignments" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Add Assignment</span>
            </a>
            <a 
              href="/admin/quizzes" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <HelpCircle className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Add Quiz</span>
            </a>
            <a 
              href="/admin/students" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <Users className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Manage Students</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
