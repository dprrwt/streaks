import { useState, useEffect } from 'react';
import { useHabits } from './hooks/useHabits';
import { HabitCard } from './components/HabitCard';
import { AddHabitModal } from './components/AddHabitModal';

function App() {
  const { habits, addHabit, deleteHabit, toggleCompletion } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('streaks-dark');
    return stored ? JSON.parse(stored) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('streaks-dark', JSON.stringify(isDark));
  }, [isDark]);

  const today = new Date().toISOString().split('T')[0];
  const completedToday = habits.filter(h => h.completions.includes(today)).length;

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
      <header className="sticky top-0 z-10 p-4 flex items-center justify-between" style={{ backgroundColor: 'var(--bg)' }}>
        <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
          STREAKS
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold"
            style={{ backgroundColor: 'var(--card)', color: 'var(--text)' }}
          >
            +
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundColor: 'var(--card)' }}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="px-4">
        {habits.length === 0 ? (
          <div className="text-center py-12" style={{ color: 'var(--muted)' }}>
            <p className="text-lg mb-2">No habits yet</p>
            <p className="text-sm">Tap + to add your first habit</p>
          </div>
        ) : (
          habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={() => toggleCompletion(habit.id)}
              onDelete={() => deleteHabit(habit.id)}
            />
          ))
        )}
      </main>

      <footer 
        className="fixed bottom-0 left-0 right-0 p-4 text-center border-t"
        style={{ 
          backgroundColor: 'var(--bg)', 
          borderColor: 'var(--border)',
          color: 'var(--muted)'
        }}
      >
        Today: {completedToday}/{habits.length} complete
      </footer>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addHabit}
      />
    </div>
  );
}

export default App;
