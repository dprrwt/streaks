export interface Habit {
  id: string;
  name: string;
  emoji: string;
  createdAt: string;
  completions: string[]; // ISO date strings (YYYY-MM-DD)
}
