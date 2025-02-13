export const STATUS_MESSAGE = {
  SUCCESS: 'Success',
  FAILED: 'Failed',
  SERVER_ERROR: 'Server error',
  DATABASE_ERROR: 'Something wrong with the DB',
  DATABASE_LIVE: 'DATABASE is live',
  REQUEST_VALIDATION_FAILED: 'Request Validation Failed',
  ERROR_MESSAGE: 'Oops, Something went wrong',
};

export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const HTTP_STATUS_CODE = {
  SUCCESS_RESPONSE_CODE: 200,
  CREATE_RESPONSE_CODE: 201,
  BAD_REQUEST_RESPONSE_CODE: 400,
  UNAUTHORIZED_RESPONSE_CODE: 401,
  FORBIDDEN_RESPONSE_CODE: 403,
  NOT_FOUND_RESPONSE_CODE: 404,
  CONFLICT_RESPONSE_CODE: 409,
  SERVER_INTERNAL_ERROR_RESPONSE_CODE: 500,
  NOT_IMPLEMENTED_RESPONSE_CODE: 500,
  BAD_GATEWAY_RESPONSE_CODE: 502,
};

export const MESSAGES = {
  CREATED: 'Successfully Created',
  UPDATED: 'Successfully Updated',
  DELETED: 'Successfully Deleted',
  TEMPORARY_DELETED: 'Successfully Temporary Deleted',
  DATA_SUCCESS: 'Data Succesfully Retrieved',
  ALREADY_EXIST: 'Data Already Exist',
  RESULT_NOT_FOUND: 'Data Not Found',
};
