export interface IApiEnvelope<T> {
  message: string;
  data: T;
}

/** Pagination metadata returned by paginated list endpoints. */
export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** Server response envelope for a paginated list. */
export interface IPaginatedEnvelope<T> {
  message: string;
  data: T[];
  pagination: IPagination;
}

/** Normalised shape RTK Query exposes to components for a paginated list. */
export interface IPaginatedResult<T> {
  items: T[];
  pagination: IPagination;
}

export type SortOrder = 'asc' | 'desc';

/** Common query params accepted by every paginated list endpoint. */
export interface IListQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: SortOrder;
}

export const EMPTY_PAGINATION: IPagination = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

export interface IApiError {
  status: number;
  message: string;
  transactionId: string | null;
  isOffline: boolean;
}

export type Role = 'Student' | 'Warden' | 'Mess Secretary' | 'Mess Owner' | 'Other';
