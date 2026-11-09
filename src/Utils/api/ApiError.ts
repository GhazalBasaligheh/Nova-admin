import { ApiErrorKind } from '@/types/Enums/ApiErrorKind';

// The single error type every request rejects with.
export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.status = status;
  }
}

// Serializable form for Redux state (class instances don't belong in the store).
export interface SerializedApiError {
  kind: ApiErrorKind;
  status?: number;
}

export function serializeApiError(error: unknown): SerializedApiError {
  if (error instanceof ApiError) return { kind: error.kind, status: error.status };
  return { kind: ApiErrorKind.Network };
}
