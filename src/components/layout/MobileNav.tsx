import { Home, BarChart3, FolderOpen, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BarChart3, label: "Grades", path: "/grades" },
  { icon: FolderOpen, label: "Materials", path: "/materials" },
  { icon: User, label: "Profile", path: "/profile" },
];

const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="flex items-center justify-around rounded-full bg-[#1a1a1a] px-4 py-2 shadow-float">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-5 py-2 rounded-full transition-all duration-200",
                isActive 
                  ? "bg-primary" 
                  : ""
              )}
            >
              <Icon className={cn(
                "h-5 w-5", 
                isActive ? "text-primary-foreground" : "text-gray-400"
              )} />
              <span className={cn(
                "text-[10px] font-medium",
                isActive ? "text-primary-foreground" : "text-gray-400"
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

export default MobileNav;
