import { ApiResponse } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../config/constants.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Global Error Handler:", err);

  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";

  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "File too large. Maximum allowed file size per upload is 50MB.";
  }

  return ApiResponse.error(
    res,
    message,
    process.env.NODE_ENV === "development" ? [err.stack] : [],
    statusCode
  );
};
