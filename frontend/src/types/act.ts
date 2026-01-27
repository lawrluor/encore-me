import { type Set } from './set';

export type Act = {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  sets?: Set[];  // only if passed from UserTree data
}