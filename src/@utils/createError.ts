import { AxiosError } from "axios";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class HttpError extends AxiosError {
  constructor(error: AxiosError) {
    super(error.message);
    this.name = "HttpError";
    this.status = error.response?.status ?? 500;

    if (this.status === 401) {
      this.message = "Please sign in.";
    }

    if (this.status === 400) {
      this.message = "The processing failed. Please check again.";
    }
  }
}
