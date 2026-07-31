import React from 'react';

interface JournalChecklistProps {
  checklist: { text: string; checked: boolean }[];
  onToggleChecklist: (index: number) => void;
  onAddChecklistItem: (text: string) => void;
}

export const JournalChecklist: React.FC<JournalChecklistProps> = ({
  checklist,
  onToggleChecklist,
  onAddChecklistItem,
}) => {
  const [newItem, setNewItem] = React.useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    onAddChecklistItem(newItem.trim());
    setNewItem('');
  };

  return (
    <div className="bg-[#141824] border border-[#212636] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-[#f4f6fa]">Execution Checklist</h4>
        <span className="text-[11px] font-mono text-[#2981eb]">
          {checklist.filter((c) => c.checked).length}/{checklist.length} Completed
        </span>
      </div>

      <div className="space-y-2 mb-3">
        {checklist.map((item, idx) => (
          <label
            key={idx}
            className="flex items-center gap-2.5 text-xs text-[#9aa2b3] cursor-pointer hover:text-[#f4f6fa]"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onToggleChecklist(idx)}
              className="w-4 h-4 rounded border-[#212636] bg-[#0e1017] text-[#2981eb] focus:ring-0"
            />
            <span className={item.checked ? 'line-through text-[#5c6478]' : ''}>
              {item.text}
            </span>
          </label>
        ))}
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 pt-2 border-t border-[#212636]">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add rule item..."
          className="flex-1 bg-[#0e1017] border border-[#212636] rounded-lg px-3 py-1.5 text-xs text-[#f4f6fa] outline-none focus:border-[#2981eb]"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-[#2981eb] hover:bg-[#5aa2f2] text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
};
