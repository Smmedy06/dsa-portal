// Ranking system - calculates student rank within their section

import { supabase } from '@/integrations/supabase/client';
import { getStudentStats } from './studentData';
import { getStudentGradeData, getGradeSheetConfig } from './googleSheets';

export interface StudentRank {
  rollNumber: string;
  name: string;
  overallLabGrade: number;
  overallCourseGrade: number;
  rank: number;
}

/**
 * Get student rank within their section
 */
export async function getStudentRank(
  rollNumber: string,
  section: 'CS-F24-M' | 'CS-F24-A'
): Promise<number | null> {
  try {
    // Get all students in the section
    const { data: students, error } = await supabase
      .from('enrolled_students')
      .select('roll_number, name')
      .eq('section', section);

    if (error) throw error;
    if (!students || students.length === 0) return null;

    // If only one student enrolled, they are rank 1 (even without grades)
    if (students.length === 1 && students[0].roll_number === rollNumber) {
      return 1;
    }

    // Calculate stats for all students
    const studentStats = await Promise.all(
      students.map(async (student) => {
        try {
          const stats = await getStudentStats(student.roll_number, section);
          // Only include students with actual grades (overallLabGrade > 0)
          if (stats.overallLabGrade > 0) {
            return {
              rollNumber: student.roll_number,
              name: student.name,
              overallLabGrade: stats.overallLabGrade,
              overallCourseGrade: stats.overallCourseGrade,
            };
          }
          return null;
        } catch (error) {
          console.error(`Error getting stats for ${student.roll_number}:`, error);
          return null;
        }
      })
    );

    // Filter out null values (students with no grades)
    const validStats = studentStats.filter(s => s !== null) as Array<{
      rollNumber: string;
      name: string;
      overallLabGrade: number;
      overallCourseGrade: number;
    }>;

    // If no students have grades yet, return null
    if (validStats.length === 0) {
      return null;
    }

    // Sort by overallLabGrade (descending)
    validStats.sort((a, b) => b.overallLabGrade - a.overallLabGrade);

    // Find rank (1-based) - only among students with grades
    const rank = validStats.findIndex(s => s.rollNumber === rollNumber) + 1;
    
    // If only one student with grades, they are rank 1
    if (validStats.length === 1 && validStats[0].rollNumber === rollNumber) {
      return 1;
    }
    
    return rank > 0 ? rank : null;
  } catch (error) {
    console.error('Error calculating rank:', error);
    return null;
  }
}
