import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradeDonutChart from "@/components/dashboard/GradeDonutChart";
import { useAuth } from "@/contexts/AuthContext";
import { getStudentGrades } from "@/lib/studentData";
import { getLetterGrade } from "@/lib/grading";

const GradeCard = ({ item }: { item: any }) => {
  // For bonus/penalty columns, show as single value (no percentage)
  const isBonusOrPenalty = item.isBonusOrPenalty;
  const percentage = isBonusOrPenalty ? 100 : (item.total > 0 ? Math.round((item.score / item.total) * 100) : 0);

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-all">
      {!isBonusOrPenalty && (
        <GradeDonutChart
          percentage={percentage}
          size="sm"
          label=""
        />
      )}
      {isBonusOrPenalty && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <span className="text-lg font-bold text-foreground">
            {item.score > 0 ? '+' : ''}{item.score?.toFixed(0) || 0}
          </span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{item.title}</p>
      </div>
      <div className="text-right">
        {isBonusOrPenalty ? (
          <p className="font-semibold text-foreground text-lg">
            {item.score > 0 ? '+' : ''}{item.score?.toFixed(0) || 0}
          </p>
        ) : (
          <>
            <p className="font-semibold text-foreground">
              {item.score?.toFixed(1) || 0}/{item.total}
            </p>
            <p className="text-sm text-muted-foreground">{percentage}%</p>
          </>
        )}
      </div>
    </div>
  );
};

const CategorySummary = ({
  title,
  score,
  total,
  count
}: {
  title: string;
  score: number;
  total: number;
  count: number;
}) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
      <div className="flex-1">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{count} items</p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-foreground">{percentage}%</p>
        <p className="text-sm text-muted-foreground">{score.toFixed(1)}/{total.toFixed(1)}</p>
      </div>
    </div>
  );
};

const Grades = () => {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [gradeData, setGradeData] = useState<{
    tabs: Array<{
      name: string;
      items: Array<{
        id: string;
        title: string;
        score: number;
        total: number;
        columnName: string;
        isBonusOrPenalty?: boolean;
      }>;
      visible: boolean;
    }>;
    labs: any[];
    assignments: any[];
    quizzes: any[];
    exams: any[];
  }>({
    tabs: [],
    labs: [],
    assignments: [],
    quizzes: [],
    exams: [],
  });

  useEffect(() => {
    if (profile?.roll_number) {
      fetchGrades();
    }
  }, [profile]);

  const fetchGrades = async () => {
    if (!profile?.roll_number) return;

    try {
      // Only set loading if we don't have data
      if (gradeData.tabs.length === 0) {
        setLoading(true);
      }
      const data = await getStudentGrades(profile.roll_number, profile.section as 'CS-F24-M' | 'CS-F24-A' | undefined);
      setGradeData(data);
      // Cache the fresh data
      setGradeData(data);
    } catch (error: any) {
      console.error('Error fetching grades:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter visible tabs only (show even if empty, as long as visible)
  // Explicitly check: visible must be true or undefined (default to visible)
  const visibleTabs = gradeData.tabs.filter(tab => {
    // If visible is explicitly false, hide it
    if (tab.visible === false) {
      return false;
    }
    // Otherwise show it (true or undefined)
    return true;
  });

  // Calculate summary for each visible tab (exclude only "Extra" tab)
  const tabSummaries = visibleTabs
    .filter(tab => {
      const tabNameLower = tab.name.toLowerCase().trim();
      // Only exclude "Extra" tab, show summary for all other tabs
      return tabNameLower !== 'extra';
    })
    .map(tab => {
      // Filter out bonus/penalty items from summary calculations
      const regularItems = tab.items.filter(item => !item.isBonusOrPenalty);
      const score = regularItems.reduce((acc, item) => acc + (item.score || 0), 0);
      const total = regularItems.reduce((acc, item) => acc + (item.total || 0), 0);
      return {
        name: tab.name,
        score,
        total,
        count: regularItems.length,
      };
    });

  // Get default tab from sessionStorage or first visible tab
  const getDefaultTab = () => {
    const saved = sessionStorage.getItem('gradesActiveTab');
    if (saved && visibleTabs.some(t => t.name.toLowerCase().replace(/\s+/g, '-') === saved)) {
      return saved;
    }
    return visibleTabs.length > 0 ? visibleTabs[0].name.toLowerCase().replace(/\s+/g, '-') : '';
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab());

  // Update active tab when visible tabs are loaded (preserve selection if still valid)
  useEffect(() => {
    if (visibleTabs.length > 0 && !loading) {
      const saved = sessionStorage.getItem('gradesActiveTab');
      const savedTab = saved && visibleTabs.some(t => t.name.toLowerCase().replace(/\s+/g, '-') === saved) ? saved : null;
      if (savedTab && savedTab !== activeTab) {
        setActiveTab(savedTab);
      } else if (!savedTab || !visibleTabs.some(t => t.name.toLowerCase().replace(/\s+/g, '-') === activeTab)) {
        const firstTab = visibleTabs[0].name.toLowerCase().replace(/\s+/g, '-');
        setActiveTab(firstTab);
        sessionStorage.setItem('gradesActiveTab', firstTab);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, visibleTabs.length]);

  if (loading && gradeData.tabs.length === 0) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading grades...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (visibleTabs.length === 0 && !loading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Grades</h1>
            <p className="text-muted-foreground">View your performance across all categories</p>
          </div>
          <div className="text-center py-12 text-muted-foreground">
            <p>No grades available yet.</p>
            <p className="text-sm mt-2">Grades will appear here once they're synced from Google Sheets.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Grades</h1>
          <p className="text-muted-foreground">View your performance across all categories</p>
        </div>

        {/* Summary Cards - Dynamic based on visible tabs */}
        {tabSummaries.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
            {tabSummaries.map((summary) => (
              <CategorySummary
                key={summary.name}
                title={summary.name}
                score={summary.score}
                total={summary.total}
                count={summary.count}
              />
            ))}
          </div>
        )}

        {/* Tabs - Dynamic based on visible tabs */}
        {visibleTabs.length > 0 && (
          <Tabs
            value={activeTab || (visibleTabs.length > 0 ? visibleTabs[0].name.toLowerCase().replace(/\s+/g, '-') : '')}
            onValueChange={(value) => {
              setActiveTab(value);
              sessionStorage.setItem('gradesActiveTab', value);
            }}
            className="animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <TabsList className="bg-muted/50 p-2 rounded-xl grid grid-cols-3 sm:flex sm:flex-wrap gap-3 sm:justify-start">
              {visibleTabs.map((tab) => {
                const tabValue = tab.name.toLowerCase().replace(/\s+/g, '-');
                return (
                  <TabsTrigger
                    key={tab.name}
                    value={tabValue}
                    className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm truncate px-3 py-1.5 shadow-sm transition-all"
                  >
                    <span className="truncate">{tab.name} ({tab.items.length})</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {visibleTabs.map((tab) => {
              const tabValue = tab.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <TabsContent key={tab.name} value={tabValue} className="mt-4 space-y-3">
                  {tab.items.length > 0 ? (
                    tab.items.map((item) => (
                      <GradeCard key={item.id} item={item} />
                    ))
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No grades available in {tab.name} yet.</p>
                      <p className="text-sm mt-1">Grades will appear here once they're added.</p>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        )}
      </div>
    </AppLayout>
  );
};

export default Grades;
