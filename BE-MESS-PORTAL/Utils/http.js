// Canonical HTTP status codes used across the API.
export const statusCode = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  notAcceptable: 406,
  conflict: 409,
  unprocessableEntity: 422,
  tooManyRequests: 429,
  internalServerError: 500,
};

// Pagination defaults / guard-rails shared by the list endpoints.
// `maxLimit` is generous enough to back a full CSV export in one request
// while still bounding the worst-case response size.
export const pagination = {
  defaultPage: 1,
  defaultLimit: 10,
  maxLimit: 500,
};
