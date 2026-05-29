import { pagination as defaults } from './http.js';

/**
 * Normalises pagination/sort/search query params into a safe, bounded shape.
 *
 *   ?page=2&limit=20&search=foo&sortBy=createdAt&order=desc
 *
 * - `page`  is clamped to >= 1
 * - `limit` is clamped to [1, maxLimit]
 * - `sortBy` is validated against an allow-list (prevents arbitrary-field sorts)
 * - `order` becomes 1 (asc) or -1 (desc)
 */
export const parseListQuery = (query = {}, { allowedSortFields = [], defaultSort = 'createdAt' } = {}) => {
  const page = Math.max(1, Number.parseInt(query.page, 10) || defaults.defaultPage);
  const requestedLimit = Number.parseInt(query.limit, 10) || defaults.defaultLimit;
  const limit = Math.min(Math.max(1, requestedLimit), defaults.maxLimit);

  const search = typeof query.search === 'string' ? query.search.trim() : '';

  const sortBy = allowedSortFields.includes(query.sortBy) ? query.sortBy : defaultSort;
  const order = query.order === 'asc' ? 1 : -1;

  return { page, limit, skip: (page - 1) * limit, search, sort: { [sortBy]: order }, sortBy, order };
};

/** Builds the pagination metadata block returned alongside list `data`. */
export const buildPaginationMeta = ({ total, page, limit }) => ({
  total,
  page,
  limit,
  totalPages: Math.max(1, Math.ceil(total / limit)),
  hasNextPage: page * limit < total,
  hasPrevPage: page > 1,
});

/** Escapes user input before using it inside a `$regex` to avoid ReDoS / injection. */
export const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
