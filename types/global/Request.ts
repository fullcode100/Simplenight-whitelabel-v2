export interface ApiResponse<Request, Data> {
  echo_request: Request | null;
  status_code: number;
  data: Data;
  total_qty: number;
  timestamp: Date;
}
