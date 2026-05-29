import { useMemo, useState } from 'react';

import { useGetAllStudentsQuery } from 'Redux/Slices/Common/StudentApi';
import type { IStudentListRow } from 'Common/types/domain.types';

export const useStudents = () => {
  const { data, isLoading, error, refetch } = useGetAllStudentsQuery();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<IStudentListRow | null>(null);

  const students = useMemo(() => data ?? [], [data]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;
    return students.filter((student) =>
      [student.studentName, student.studentRoll, student.emailId, student.number].some((field) =>
        field?.toLowerCase().includes(query),
      ),
    );
  }, [students, search]);

  return {
    students,
    filtered,
    total: students.length,
    search,
    setSearch,
    selected,
    openProfile: (student: IStudentListRow) => setSelected(student),
    closeProfile: () => setSelected(null),
    isLoading,
    error,
    refetch,
  };
};
