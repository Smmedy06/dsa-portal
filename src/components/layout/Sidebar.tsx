import { Home, BarChart3, FolderOpen, Settings, LogOut, BookOpen, FileText, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mainNavItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: BarChart3, label: "Grades", path: "/grades" },
  { icon: FolderOpen, label: "Materials", path: "/materials" },
];

const secondaryNavItems = [
  { icon: BookOpen, label: "Labs", path: "/materials/labs" },
  { icon: FileText, label: "Assignments", path: "/materials/assignments" },
  { icon: HelpCircle, label: "Quizzes", path: "/materials/quizzes" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-card border-r border-border p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-soft">
          <span className="text-lg font-bold text-primary-foreground">DS</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">DSA Portal</h1>
          <p className="text-xs text-muted-foreground">PUCIT • Fall 2024</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Main Menu
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
                  ? "bg-primary text-primary-foreground shadow-soft" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}

        <Separator className="my-4" />

        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Quick Access
        </p>
        {secondaryNavItems.map((item) => {
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
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <Settings className="h-5 w-5" />
          Settings
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

export default Sidebar;
