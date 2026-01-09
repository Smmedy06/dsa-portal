import { Eye, EyeOff, RefreshCw, ExternalLink } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const gradeColumns = [
  { id: "roll_number", name: "Roll Number", visible: true, locked: true },
  { id: "student_name", name: "Student Name", visible: true, locked: true },
  { id: "lab1", name: "Lab 1", visible: true, locked: false },
  { id: "lab2", name: "Lab 2", visible: true, locked: false },
  { id: "lab3", name: "Lab 3", visible: true, locked: false },
  { id: "lab4", name: "Lab 4", visible: true, locked: false },
  { id: "lab5", name: "Lab 5", visible: true, locked: false },
  { id: "lab6", name: "Lab 6", visible: true, locked: false },
  { id: "lab7", name: "Lab 7", visible: true, locked: false },
  { id: "lab8", name: "Lab 8", visible: false, locked: false },
  { id: "assignment1", name: "Assignment 1", visible: true, locked: false },
  { id: "assignment2", name: "Assignment 2", visible: true, locked: false },
  { id: "assignment3", name: "Assignment 3", visible: false, locked: false },
  { id: "assignment4", name: "Assignment 4", visible: false, locked: false },
  { id: "quiz1", name: "Quiz 1", visible: true, locked: false },
  { id: "quiz2", name: "Quiz 2", visible: true, locked: false },
  { id: "quiz3", name: "Quiz 3", visible: true, locked: false },
  { id: "quiz4", name: "Quiz 4", visible: true, locked: false },
  { id: "quiz5", name: "Quiz 5", visible: false, locked: false },
  { id: "midterm", name: "Midterm", visible: true, locked: false },
  { id: "final", name: "Final", visible: false, locked: false },
];

const AdminGrades = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Grades Configuration</h1>
            <p className="text-muted-foreground">Configure Google Sheets integration and column visibility</p>
          </div>
          <Button variant="outline" className="rounded-xl gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync Now
          </Button>
        </div>

        {/* Google Sheets Connection */}
        <div 
          className="bg-card rounded-2xl border border-border p-6 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Google Sheets Connection</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sheetUrl">Google Sheet URL</Label>
              <div className="flex gap-2">
                <Input 
                  id="sheetUrl" 
                  placeholder="https://docs.google.com/spreadsheets/d/..." 
                  className="rounded-xl flex-1"
                  defaultValue="https://docs.google.com/spreadsheets/d/1abc123xyz"
                />
                <Button variant="outline" className="rounded-xl">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                The sheet must be shared with the service account email.
              </p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div>
                <p className="text-sm font-medium text-foreground">Last Synced</p>
                <p className="text-xs text-muted-foreground">Jan 9, 2026 at 2:45 PM</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column Visibility */}
        <div 
          className="bg-card rounded-2xl border border-border p-6 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Column Visibility</h2>
            <p className="text-sm text-muted-foreground">
              {gradeColumns.filter(c => c.visible).length} of {gradeColumns.length} visible
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Control which grade columns are visible to students. Hidden columns will not appear in the student grades view.
          </p>

          <Separator className="my-4" />

          {/* Labs */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Labs</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gradeColumns.filter(c => c.id.startsWith('lab')).map((column) => (
                <div 
                  key={column.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
                >
                  <div className="flex items-center gap-2">
                    {column.visible ? (
                      <Eye className="h-4 w-4 text-primary" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{column.name}</span>
                  </div>
                  <Switch defaultChecked={column.visible} disabled={column.locked} />
                </div>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Assignments</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gradeColumns.filter(c => c.id.startsWith('assignment')).map((column) => (
                <div 
                  key={column.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
                >
                  <div className="flex items-center gap-2">
                    {column.visible ? (
                      <Eye className="h-4 w-4 text-primary" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{column.name}</span>
                  </div>
                  <Switch defaultChecked={column.visible} disabled={column.locked} />
                </div>
              ))}
            </div>
          </div>

          {/* Quizzes */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Quizzes</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gradeColumns.filter(c => c.id.startsWith('quiz')).map((column) => (
                <div 
                  key={column.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
                >
                  <div className="flex items-center gap-2">
                    {column.visible ? (
                      <Eye className="h-4 w-4 text-primary" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{column.name}</span>
                  </div>
                  <Switch defaultChecked={column.visible} disabled={column.locked} />
                </div>
              ))}
            </div>
          </div>

          {/* Exams */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Exams</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gradeColumns.filter(c => c.id === 'midterm' || c.id === 'final').map((column) => (
                <div 
                  key={column.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
                >
                  <div className="flex items-center gap-2">
                    {column.visible ? (
                      <Eye className="h-4 w-4 text-primary" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{column.name}</span>
                  </div>
                  <Switch defaultChecked={column.visible} disabled={column.locked} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end animate-fade-in" style={{ animationDelay: "300ms" }}>
          <Button className="rounded-xl bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGrades;
