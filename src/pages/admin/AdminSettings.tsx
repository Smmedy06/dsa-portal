import { Bell, Calendar, Shield, Users, LogOut, GraduationCap } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_GRADE_SCALE } from "@/lib/grading";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Admin Settings</h1>
          <p className="text-muted-foreground">Configure portal settings and preferences</p>
        </div>

        {/* Course Info */}
        <div 
          className="bg-card rounded-2xl border border-border p-6 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Course Information</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input 
                id="courseName" 
                defaultValue="Data Structures & Algorithms" 
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Input id="semester" defaultValue="Fall 2024" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Input id="section" defaultValue="BCSF23M" className="rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div 
          className="bg-card rounded-2xl border border-border p-6 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Student Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Grade Updates</p>
                <p className="text-xs text-muted-foreground">Notify students when grades are updated</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">New Materials</p>
                <p className="text-xs text-muted-foreground">Notify students when new labs/assignments are uploaded</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Deadline Reminders</p>
                <p className="text-xs text-muted-foreground">Send reminders 24 hours before deadlines</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Solution Releases</p>
                <p className="text-xs text-muted-foreground">Notify students when solutions are available</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Access Control */}
        <div 
          className="bg-card rounded-2xl border border-border p-6 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Shield className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Access Control</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Require PUCIT Email</p>
                <p className="text-xs text-muted-foreground">Only allow @pucit.edu.pk email addresses</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Enrollment Required</p>
                <p className="text-xs text-muted-foreground">Students must be in the enrolled list to access</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Grading System */}
        <div 
          className="bg-card rounded-2xl border border-border p-6 animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Grading System</h2>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Current grading scale used to calculate letter grades from percentages.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 font-semibold text-foreground">Min %</th>
                    <th className="text-left p-2 font-semibold text-foreground">Max %</th>
                    <th className="text-left p-2 font-semibold text-foreground">Letter</th>
                    <th className="text-left p-2 font-semibold text-foreground">GPA</th>
                  </tr>
                </thead>
                <tbody>
                  {DEFAULT_GRADE_SCALE.map((grade, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="p-2 text-muted-foreground">{grade.min}</td>
                      <td className="p-2 text-muted-foreground">{grade.max}</td>
                      <td className="p-2 font-medium text-foreground">{grade.letter}</td>
                      <td className="p-2 text-muted-foreground">{grade.gpa.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Note: Students with 0% (no grades yet) will not be assigned an F grade.
            </p>
          </div>
        </div>

        {/* Manage TAs */}
        <div 
          className="bg-card rounded-2xl border border-border p-6 animate-fade-in"
          style={{ animationDelay: "500ms" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Teaching Assistants</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div>
                <p className="text-sm font-medium text-foreground">TA Name</p>
                <p className="text-xs text-muted-foreground">ta@pucit.edu.pk</p>
              </div>
              <span className="text-xs font-medium text-primary">Admin</span>
            </div>
            <Button variant="outline" className="w-full rounded-xl">
              <Users className="h-4 w-4 mr-2" />
              Add Teaching Assistant
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div 
          className="bg-card rounded-2xl border border-destructive/30 p-6 animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Reset All Grades
            </Button>
            <Button 
              variant="outline" 
              className="w-full rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
