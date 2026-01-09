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
      <div className="flex items-center justify-around rounded-3xl bg-foreground px-2 py-3 shadow-float pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground/70 hover:text-background"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "animate-scale-in")} />
              <span className={cn(
                "text-[10px] font-medium transition-all",
                isActive ? "opacity-100" : "opacity-70"
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
