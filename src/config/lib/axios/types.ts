export interface ApiError {
  statusCode: number;
  message: Array<string> | string;
  error: string;
}
