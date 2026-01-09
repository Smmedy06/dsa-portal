import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  userName?: string;
  rollNumber?: string;
}

const Header = ({ userName = "Student", rollNumber = "BCSF23M023" }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <span className="text-lg font-bold text-primary-foreground">DS</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">DSA Portal</h1>
            <p className="text-xs text-muted-foreground">Data Structures & Algorithms</p>
          </div>
        </div>

        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search labs, assignments..." 
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-muted">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-secondary" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 border-l border-border">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground font-mono">{rollNumber}</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl bg-muted hover:bg-muted/80">
              <User className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
