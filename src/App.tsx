import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Grades from "./pages/Grades";
import Materials from "./pages/Materials";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminLabs from "./pages/admin/AdminLabs";
import AdminAssignments from "./pages/admin/AdminAssignments";
import AdminQuizzes from "./pages/admin/AdminQuizzes";
import AdminGrades from "./pages/admin/AdminGrades";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/materials/labs" element={<Materials />} />
          <Route path="/materials/assignments" element={<Materials />} />
          <Route path="/materials/quizzes" element={<Materials />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/labs" element={<AdminLabs />} />
          <Route path="/admin/assignments" element={<AdminAssignments />} />
          <Route path="/admin/quizzes" element={<AdminQuizzes />} />
          <Route path="/admin/grades" element={<AdminGrades />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
