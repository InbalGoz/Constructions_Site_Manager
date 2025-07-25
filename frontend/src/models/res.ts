export interface Res {
  data: Data;
}

interface Data {
  success: boolean;
  data?: unknown;
  error: unknown;
}
