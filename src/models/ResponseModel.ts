export interface ResponseModel<T> {
  code: number;
  data: T;
  message: string;
  isSuccess: boolean;
  resultsCount?: number;
  recordsTotal?: number;
  pagesCount?: number;
}
