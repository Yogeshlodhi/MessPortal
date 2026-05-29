/**
 * Strips empty / undefined values from a list-query object so we never send
 * `?search=&status=` noise to the server (which would also fragment the RTK
 * Query cache by producing distinct-but-equivalent cache keys).
 *
 * Accepts any plain query object (e.g. `IListQuery` extended with `status` /
 * `mealOfDay`) — interfaces lack an implicit index signature, so the parameter
 * is typed as `object` and read through a local cast.
 */
export const buildListParams = (query: object = {}): Record<string, string | number> => {
  const params: Record<string, string | number> = {};
  Object.entries(query as Record<string, unknown>).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = value as string | number;
    }
  });
  return params;
};
