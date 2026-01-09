import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { User, Mail, Hash, Calendar, Award, LogOut } from "lucide-react";
import GradeDonutChart from "@/components/dashboard/GradeDonutChart";

const Profile = () => {
  const studentData = {
    name: "Ahmed Hassan",
    email: "bcsf23m023@pucit.edu.pk",
    rollNumber: "BCSF23M023",
    semester: "Fall 2024",
    section: "A",
    overallGrade: 82,
    rank: 12,
    totalStudents: 120,
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Profile</h1>
          <p className="text-muted-foreground">Your student information and settings</p>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary text-3xl font-bold text-primary-foreground">
              {studentData.name.split(" ").map(n => n[0]).join("")}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-foreground">{studentData.name}</h2>
              <p className="text-muted-foreground font-mono">{studentData.rollNumber}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-foreground text-sm font-medium">
                  Section {studentData.section}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
                  {studentData.semester}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="bg-card rounded-2xl border border-border p-6 text-center">
            <GradeDonutChart percentage={studentData.overallGrade} size="md" label="Overall Grade" />
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center justify-center">
            <Award className="h-8 w-8 text-secondary mb-2" />
            <p className="text-3xl font-bold text-foreground">#{studentData.rank}</p>
            <p className="text-sm text-muted-foreground">of {studentData.totalStudents} students</p>
          </div>
        </div>

        {/* Details */}
        <div className="bg-card rounded-2xl border border-border divide-y divide-border animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium text-foreground">{studentData.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{studentData.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Hash className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Roll Number</p>
              <p className="font-medium text-foreground font-mono">{studentData.rollNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Current Semester</p>
              <p className="font-medium text-foreground">{studentData.semester}</p>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <Button 
          variant="outline" 
          className="w-full rounded-xl gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default Profile;
