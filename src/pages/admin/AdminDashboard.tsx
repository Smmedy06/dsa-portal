import { useEffect, useState } from "react";
import { Users, BookOpen, FileText, HelpCircle, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import StatCard from "@/components/dashboard/StatCard";
import { getAllStudents } from "@/lib/students";
import { getAllLabs, getAllAssignments, getAllQuizzes } from "@/lib/content";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    labs: 0,
    assignments: 0,
    quizzes: 0,
  });
  const [loading, setLoading] = useState(false); // Start false

  useEffect(() => {
    let mounted = true;
    
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [students, labs, assignments, quizzes] = await Promise.all([
          getAllStudents(),
          getAllLabs(),
          getAllAssignments(),
          getAllQuizzes(),
        ]);

        if (!mounted) return;

        setStats({
          totalStudents: students.length,
          labs: labs.length,
          assignments: assignments.length,
          quizzes: quizzes.length,
        });
      } catch (error: any) {
        console.error('Error fetching stats:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, []);

  const adminStats = [
    { 
      title: "Total Students", 
      value: loading ? "..." : stats.totalStudents.toString(), 
      subtitle: undefined, 
      icon: Users 
    },
    { 
      title: "Labs", 
      value: loading ? "..." : stats.labs.toString(), 
      subtitle: undefined, 
      icon: BookOpen 
    },
    { 
      title: "Assignments", 
      value: loading ? "..." : stats.assignments.toString(), 
      subtitle: undefined, 
      icon: FileText 
    },
    { 
      title: "Quizzes", 
      value: loading ? "..." : stats.quizzes.toString(), 
      subtitle: undefined, 
      icon: HelpCircle 
    },
  ];

  const upcomingSchedule = [
    { id: 1, title: "Lab 9: Hash Tables", type: "Lab", date: "Jan 15, 2026" },
    { id: 2, title: "Quiz 6: Trees & Graphs", type: "Quiz", date: "Jan 18, 2026" },
    { id: 3, title: "Assignment 4 Deadline", type: "Deadline", date: "Jan 12, 2026" },
  ];

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
              <div className="text-center py-8 text-muted-foreground">
                <p>Recent activity will appear here</p>
                <p className="text-sm">Activity tracking coming soon</p>
              </div>
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
            <Link 
              to="/admin/labs" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Add Lab</span>
            </Link>
            <Link 
              to="/admin/assignments" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Add Assignment</span>
            </Link>
            <Link 
              to="/admin/quizzes" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <HelpCircle className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Add Quiz</span>
            </Link>
            <Link 
              to="/admin/students" 
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <Users className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">Manage Students</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
