import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container py-6 pb-24 md:pb-6">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};

export default AppLayout;
