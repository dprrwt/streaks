import { useState } from 'react';

const EMOJI_OPTIONS = ['🧊', '💪', '🧘', '📖', '🏃', '💧', '🥗', '😴', '✍️', '🎯', '🧠', '🌅', '🎸', '💻', '🌿', '☀️'];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, emoji: string) => void;
}

export function AddHabitModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🎯');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), emoji);
      setName('');
      setEmoji('🎯');
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-2xl p-6"
        style={{ backgroundColor: 'var(--card)' }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
          New Habit
        </h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Habit name..."
            className="w-full p-3 rounded-xl mb-4 outline-none"
            style={{ 
              backgroundColor: 'var(--bg)', 
              color: 'var(--text)',
              border: '1px solid var(--border)'
            }}
            autoFocus
          />
          
          <div className="mb-4">
            <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>Pick an emoji:</p>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className="w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: emoji === e ? 'var(--accent)' : 'var(--border)',
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-medium transition-colors"
              style={{ backgroundColor: 'var(--border)', color: 'var(--text)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl font-medium text-white transition-colors"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
