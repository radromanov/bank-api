import "../utils/dotenv";

export class ApiError extends Error {
  public trace: string | null;

  private constructor(
    public status: number,
    public message: string,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, ApiError.prototype);

    this.trace =
      process.env.NODE_ENV === "production"
        ? null
        : this.stack || "Unknown stack trace";
  }

  static BAD_REQUEST(message: string = "Bad Request") {
    return new ApiError(400, message);
  }

  static UNAUTHORIZED(message: string = "Unauthorized") {
    return new ApiError(401, message);
  }

  static FORBIDDEN(message: string = "Forbidden") {
    return new ApiError(403, message);
  }

  static NOT_FOUND(message: string = "Not Found") {
    return new ApiError(404, message);
  }

  static METHOD_NOT_ALLOWED(message: string = "Method Not Allowed") {
    return new ApiError(405, message);
  }

  static REQUEST_TIMEOUT(message: string = "Request Timeout") {
    return new ApiError(408, message);
  }

  static CONFLICT(message: string = "Conflict") {
    return new ApiError(409, message);
  }

  static PAYLOAD_TOO_LARGE(message: string = "Payload Too Large") {
    return new ApiError(413, message);
  }
  static UNPROCESSABLE_ENTITY(message: string = "Unprocessable Entity") {
    return new ApiError(422, message);
  }
  static TOO_MANY_REQUESTS(message: string = "Too Many Requests") {
    return new ApiError(429, message);
  }

  static INTERNAL_SERVER_ERROR(message: string = "Internal Server Error") {
    return new ApiError(500, message);
  }

  static BAD_GATEWAY(message: string = "Bad Gateway") {
    return new ApiError(502, message);
  }

  static SERVICE_UNAVAILABLE(message: string = "Service Unavailable") {
    return new ApiError(503, message);
  }
}
