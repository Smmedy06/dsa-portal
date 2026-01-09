import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
            <span className="text-lg font-bold text-secondary-foreground">TA</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">DSA Portal</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-muted">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 border-l border-border">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-foreground">TA Name</p>
              <p className="text-xs text-muted-foreground">Teaching Assistant</p>
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

export default AdminHeader;
