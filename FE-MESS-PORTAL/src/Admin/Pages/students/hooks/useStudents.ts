import { useState } from 'react';

import { useGetAllStudentsQuery, useLazyGetAllStudentsQuery } from 'Redux/Slices/Common/StudentApi';
import { useDebouncedValue } from 'Common/Hooks/useDebouncedValue';
import type { SortOrder } from 'Common/types/api.types';
import type { IStudentListRow } from 'Common/types/domain.types';

const DEFAULT_LIMIT = 10;

export const useStudents = () => {
  const [page, setPage] = useState(0); // zero-based, for MUI TablePagination
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [search, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState<SortOrder>('desc');
  const [selected, setSelected] = useState<IStudentListRow | null>(null);

  const debouncedSearch = useDebouncedValue(search.trim(), 400);

  const { data, isLoading, isFetching, error, refetch } = useGetAllStudentsQuery({
    page: page + 1,
    limit,
    search: debouncedSearch,
    sortBy,
    order,
  });

  const [triggerExport, { isFetching: isExporting }] = useLazyGetAllStudentsQuery();

  const students = data?.items ?? [];
  const total = data?.pagination.total ?? 0;

  const setSearch = (value: string) => {
    setSearchValue(value);
    setPage(0);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setOrder('asc');
    }
    setPage(0);
  };

  const changeLimit = (next: number) => {
    setLimit(next);
    setPage(0);
  };

  // Fetches every matching row (one request, bounded by the server's maxLimit)
  // so the CSV export reflects the current search, not just the visible page.
  const fetchAllForExport = async (): Promise<IStudentListRow[]> => {
    const result = await triggerExport({
      page: 1,
      limit: total || 1,
      search: debouncedSearch,
      sortBy,
      order,
    }).unwrap();
    return result.items;
  };

  return {
    students,
    total,
    page,
    setPage,
    limit,
    setLimit: changeLimit,
    search,
    setSearch,
    isSearching: debouncedSearch.length > 0,
    sortBy,
    order,
    handleSort,
    selected,
    openProfile: (student: IStudentListRow) => setSelected(student),
    closeProfile: () => setSelected(null),
    isLoading,
    isFetching,
    error,
    refetch,
    fetchAllForExport,
    isExporting,
  };
};
