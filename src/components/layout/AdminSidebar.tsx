import { Home, Users, BookOpen, FileText, HelpCircle, Settings, LogOut, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mainNavItems = [
  { icon: Home, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Students", path: "/admin/students" },
  { icon: BarChart3, label: "Grades Config", path: "/admin/grades" },
];

const contentNavItems = [
  { icon: BookOpen, label: "Labs", path: "/admin/labs" },
  { icon: FileText, label: "Assignments", path: "/admin/assignments" },
  { icon: HelpCircle, label: "Quizzes", path: "/admin/quizzes" },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-card border-r border-border p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary shadow-soft">
          <span className="text-lg font-bold text-secondary-foreground">TA</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
          <p className="text-xs text-muted-foreground">DSA Portal</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Management
        </p>
        {mainNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-secondary text-secondary-foreground shadow-soft" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}

        <Separator className="my-4" />

        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-3 mt-2">
          Content
        </p>
        {contentNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-muted text-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="space-y-1 pt-4 border-t border-border">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <Home className="h-5 w-5" />
          Student View
        </Link>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
