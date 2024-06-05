import { Response } from "express";
import { ERROR_ENVIRONMENT } from "../config/environment.js";

class ResponseHandler {
  handleErrors(res: Response, error: any ) {
    switch (error) {
      case ERROR_ENVIRONMENT.MISSING_PARAMETERS:
        this.unauthorizedMissing(res, error);
        break;
      case ERROR_ENVIRONMENT.INSERTION_FAILED:
      case ERROR_ENVIRONMENT.DELETION_FAILED:
      case ERROR_ENVIRONMENT.UPDATE_FAILED:
      case ERROR_ENVIRONMENT.INVALID_REQUEST_PREPARATION:
      case ERROR_ENVIRONMENT.INVALID_REQUEST:
        this.badRequest(res, error);
        break;
      case ERROR_ENVIRONMENT.EMAIL_NOT_FOUND:
      case ERROR_ENVIRONMENT.DNI_NOT_FOUND:
        this.notFound(res, error);
        break;
      case ERROR_ENVIRONMENT.INVALID_TOKEN:
      case ERROR_ENVIRONMENT.EMAIL_FORMAT_ERROR:
      case ERROR_ENVIRONMENT.INVALID_LOGIN_REQUEST:
      case ERROR_ENVIRONMENT.INVALID_EMAIL_REQUEST_VERIFICATION:
        this.unauthorized(res, error);
        break;
      case ERROR_ENVIRONMENT.ERROR_GENERATING_TOKEN:
      case ERROR_ENVIRONMENT.INVALID_TOKEN_DECODE:
        this.internalServerError(res, error);
        break;
      case ERROR_ENVIRONMENT.FORM_VALIDATION_FAILED:
        this.unprocessableEntity(res, error);
        break;
      case ERROR_ENVIRONMENT.INSUFFICIENT_PERMISSIONS:
        this.forbidden(res, error);
        break;
      case ERROR_ENVIRONMENT.REQUEST_TIMEOUT:
        this.requestTimeout(res, error);
        break;
      case ERROR_ENVIRONMENT.INVALID_FILE_FORMAT:
        this.badRequest(res, error);
        break;
      case ERROR_ENVIRONMENT.AUTHENTICATION_FAILED:
        this.unauthorized(res, error);
        break;
      case ERROR_ENVIRONMENT.DUPLICATE_DATA:
        this.conflict(res, error);
        break;
      case ERROR_ENVIRONMENT.SERVER_CONFIGURATION_ERROR:
      case ERROR_ENVIRONMENT.SIZE_LIMIT_EXCEEDED:
      case ERROR_ENVIRONMENT.TEMPORARY_UNAVAILABLE:
        this.internalServerError(res, error);
        break;
      default:
        this.internalServerError(res, error);
        break;
    }
  }

  success(res: Response, data: any, message = "Success") {
    res.status(200).json({ success: true, message, data });
  }

  created(res: Response, data: any, message = "Resource created") {
    res.status(201).json({ success: true, message, data });
  }

  noContent(res: Response, message = "No Content") {
    res.status(204).json({ success: true, message });
  }

  badRequest(res: Response, error?: any, message = "Bad request") {
    res.status(400).json({ success: false, message, error });
  }

  unauthorized(res: Response, error?: any, message = "Unauthorized") {
    res.status(401).json({ success: false, message, error });
  }

  unauthorizedMissing(
    res: Response,
    error?: any,
    message = ERROR_ENVIRONMENT.MISSING_PARAMETERS
  ) {
    res.status(401).json({ success: false, message, error });
  }

  unauthorizedToken(
    res: Response,
    error?: any,
    message = ERROR_ENVIRONMENT.AUTHENTICATION_FAILED
  ) {
    res.status(401).json({ success: false, message, error });
  }

  unauthorizedTokenDecode(
    res: Response,
    error?: any,
    message = ERROR_ENVIRONMENT.INVALID_TOKEN_DECODE
  ) {
    res.status(401).json({ success: false, message, error });
  }

  forbidden(res: Response, error?: any, message = "Forbidden") {
    res.status(403).json({ success: false, message, error });
  }

  notFound(res: Response, error?: any, message = "Not found") {
    res.status(404).json({ success: false, message, error });
  }

  requestTimeout(res: Response, error?: any, message = ERROR_ENVIRONMENT.REQUEST_TIMEOUT) {
    res.status(408).json({ success: false, message, error });
  }
  
  conflict(res: Response, error?: any, message = ERROR_ENVIRONMENT.DUPLICATE_DATA) {
    res.status(409).json({ success: false, message, error });
  }

  unprocessableEntity(res: Response, error?: any, message = ERROR_ENVIRONMENT.FORM_VALIDATION_FAILED) {
    res.status(422).json({ success: false, message, error });
  }

  internalServerError(
    res: Response,
    error: any,
    message = "Internal server error"
  ) {
    res.status(500).json({ success: false, message, error });
  }
}

export { ResponseHandler };
