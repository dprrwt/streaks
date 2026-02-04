import type { Habit } from '../types';
import { getStreak, getLast21Days } from '../hooks/useHabits';

interface Props {
  habit: Habit;
  onToggle: () => void;
  onDelete: () => void;
}

export function HabitCard({ habit, onToggle, onDelete }: Props) {
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completions.includes(today);
  const streak = getStreak(habit.completions);
  const dots = getLast21Days(habit.completions);

  return (
    <div 
      className="p-4 rounded-xl mb-3 transition-colors"
      style={{ backgroundColor: 'var(--card)' }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{habit.emoji}</span>
          <span className="font-medium" style={{ color: 'var(--text)' }}>
            {habit.name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>
              {streak} 🔥
            </span>
          )}
          <button
            onClick={onDelete}
            className="text-sm px-2 py-1 rounded opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--muted)' }}
            title="Delete habit"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {dots.map((done, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full transition-colors"
              style={{
                backgroundColor: done ? 'var(--accent)' : 'var(--border)',
              }}
            />
          ))}
        </div>
        
        <button
          onClick={onToggle}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all active:scale-95"
          style={{
            backgroundColor: isCompletedToday ? 'var(--accent)' : 'var(--border)',
            color: isCompletedToday ? '#fff' : 'var(--muted)',
          }}
        >
          {isCompletedToday ? '✓' : ''}
        </button>
      </div>
    </div>
  );
}
