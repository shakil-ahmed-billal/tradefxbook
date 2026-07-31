import React, { useState } from 'react';
import { Settings, Save, Check } from 'lucide-react';
import { UserProfile } from '../../types';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currency, setCurrency] = useState('USD ($)');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      avatarInitials: name.charAt(0).toUpperCase() || 'S',
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl animate-in fade-in duration-200">
      <div>
        <h1 className="font-sora text-2xl font-bold text-[#eef1f8] flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-[#7aa0ff]" />
          Account & Journal Settings
        </h1>
        <p className="text-xs text-[#565e73] mt-1">Manage profile information, display currency, and workspace preferences.</p>
      </div>

      <form onSubmit={handleSave} className="bg-[#10141d] border border-[#232a3a] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#8d94a8] mb-1.5">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#161b27] border border-[#232a3a] rounded-xl px-3.5 py-2.5 text-sm text-[#eef1f8] outline-none focus:border-[#7aa0ff]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#8d94a8] mb-1.5">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#161b27] border border-[#232a3a] rounded-xl px-3.5 py-2.5 text-sm text-[#eef1f8] outline-none focus:border-[#7aa0ff]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#8d94a8] mb-1.5">Account Base Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-[#161b27] border border-[#232a3a] rounded-xl px-3.5 py-2.5 text-sm text-[#eef1f8] outline-none focus:border-[#7aa0ff]"
          >
            <option value="USD ($)">USD ($)</option>
            <option value="EUR (€)">EUR (€)</option>
            <option value="GBP (£)">GBP (£)</option>
            <option value="JPY (¥)">JPY (¥)</option>
          </select>
        </div>

        <div className="pt-3 border-t border-[#1a2029] flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#2981eb] text-white rounded-xl text-xs font-semibold hover:bg-[#5aa2f2] flex items-center gap-2 transition-colors"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Settings Saved' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
