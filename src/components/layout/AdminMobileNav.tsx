import { Home, BarChart3, BookOpen, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/admin" },
  { icon: BarChart3, label: "Grades", path: "/admin/grades" },
  { icon: BookOpen, label: "Content", path: "/admin/labs" },
  { icon: User, label: "Students", path: "/admin/students" },
];

const AdminMobileNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin/labs") {
      return ["/admin/labs", "/admin/assignments", "/admin/quizzes"].includes(location.pathname);
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="flex items-center justify-around rounded-full bg-[#1a1a1a] px-4 py-2 shadow-float">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-5 py-2 rounded-full transition-all duration-200",
                active ? "bg-secondary" : ""
              )}
            >
              <Icon className={cn(
                "h-5 w-5", 
                active ? "text-secondary-foreground" : "text-gray-400"
              )} />
              <span className={cn(
                "text-[10px] font-medium",
                active ? "text-secondary-foreground" : "text-gray-400"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default AdminMobileNav;
