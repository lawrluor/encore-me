import type { Set } from './set';

export type User = {
  id: string
  name: string,
  email: string,
  created_at?: string,
  updated_at?: string,
  qr_code: string | null,
  promoted_set: Set | null
}