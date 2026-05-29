export interface IApiEnvelope<T> {
  message: string;
  data: T;
}

export interface IApiError {
  status: number;
  message: string;
  transactionId: string | null;
  isOffline: boolean;
}

export type Role = 'Student' | 'Warden' | 'Mess Secretary' | 'Mess Owner' | 'Other';
