import { useState, useEffect } from 'react';
import type { Habit } from '../types';

const STORAGE_KEY = 'streaks-habits';

const DEFAULT_HABITS: Habit[] = [
  { id: '1', name: 'Cold Shower', emoji: '🧊', createdAt: new Date().toISOString(), completions: [] },
  { id: '2', name: 'Workout', emoji: '💪', createdAt: new Date().toISOString(), completions: [] },
  { id: '3', name: 'Meditate', emoji: '🧘', createdAt: new Date().toISOString(), completions: [] },
  { id: '4', name: 'Read', emoji: '📖', createdAt: new Date().toISOString(), completions: [] },
];

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return DEFAULT_HABITS;
      }
    }
    return DEFAULT_HABITS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string, emoji: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      emoji,
      createdAt: new Date().toISOString(),
      completions: [],
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const toggleCompletion = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;
      const hasToday = habit.completions.includes(today);
      return {
        ...habit,
        completions: hasToday
          ? habit.completions.filter(d => d !== today)
          : [...habit.completions, today],
      };
    }));
  };

  return { habits, addHabit, deleteHabit, toggleCompletion };
}

export function getStreak(completions: string[]): number {
  if (completions.length === 0) return 0;
  
  const sorted = [...completions].sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  // Streak must include today or yesterday to be active
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
  
  let streak = 0;
  let currentDate = new Date(sorted[0]);
  
  for (const dateStr of sorted) {
    const date = new Date(dateStr);
    const diff = Math.floor((currentDate.getTime() - date.getTime()) / 86400000);
    
    if (diff > 1) break;
    if (diff <= 1) {
      streak++;
      currentDate = date;
    }
  }
  
  return streak;
}

export function getBestStreak(completions: string[]): number {
  if (completions.length === 0) return 0;
  
  const sorted = [...completions].sort();
  let best = 1;
  let current = 1;
  
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = Math.floor((curr.getTime() - prev.getTime()) / 86400000);
    
    if (diff === 1) {
      current++;
      best = Math.max(best, current);
    } else if (diff > 1) {
      current = 1;
    }
  }
  
  return best;
}

export function getLast21Days(completions: string[]): boolean[] {
  const today = new Date();
  const days: boolean[] = [];
  
  for (let i = 20; i >= 0; i--) {
    const date = new Date(today.getTime() - i * 86400000);
    const dateStr = date.toISOString().split('T')[0];
    days.push(completions.includes(dateStr));
  }
  
  return days;
}
