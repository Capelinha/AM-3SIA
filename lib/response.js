
const headers = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
};

const build = (statusCode) => (body) => {
  const response = {
    headers,
    statusCode,
    body: body !== undefined ? JSON.stringify(body) : ''
  };

  return response;
};

const buildError = (statusCode) => (msg) => {
  const response = {
    headers,
    statusCode,
    body: JSON.stringify({
      statusCode,
      msg
    })
  };
  return response;
};

const buildResponseError = (statusCode, message) => {
  statusCode = statusCode ? statusCode : 500;
  const response = {
    headers,
    statusCode,
    body: JSON.stringify({
      statusCode,
      message
    })
  };
  return response;
};

class ResponseError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;  
  }  
}

const created = build(201);
const success = build(200);
const noContent = build(204);
const badRequest = buildError(400);
const unauthorized = buildError(401);
const forbidden = buildError(403);
const notFound = buildError(404);
const notAcceptable = buildError(406);
const failure = buildError(500);

module.exports = {
  ResponseError,
  created,
  success,
  noContent,
  notAcceptable,
  failure,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  build,
  buildResponseError
};
