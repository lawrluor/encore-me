import { type Song } from './song';

export type Set = {
  id: string;
  title: string;
  description?: string;
  act_id: string;
  created_at?: string;
  updated_at?: string;
  songs?: Song[];  // only if passed from UserTree data
}