'use client';

import { useState } from 'react';

interface BookDevintPopupProps {
  onClose: () => void;
  onBook: (bookingData: any) => void;
}

const AVAILABLE_DEVINTS = ['devintam1', 'devintaf2', 'devintai1'];
const TEAMS = ['Django', 'UI', 'DataEvents', 'DataLake'];

export default function BookDevintPopup({ onClose, onBook }: BookDevintPopupProps) {
  const [name, setName] = useState('');
  const [jiraLink, setJiraLink] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedDevint, setSelectedDevint] = useState('');
  
  // Auto-select timeline: current date to 7 days after
  const today = new Date();
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const [startDate] = useState(formatDate(today));
  const [endDate] = useState(formatDate(sevenDaysLater));

  const handleTeamToggle = (team: string) => {
    setSelectedTeams((prev) =>
      prev.includes(team)
        ? prev.filter((t) => t !== team)
        : [...prev, team]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !jiraLink || !projectTitle || !participants || selectedTeams.length === 0 || !selectedDevint) {
      alert('Please fill in all fields');
      return;
    }

    onBook({
      name,
      jiraLink,
      projectTitle,
      participants,
      teams: selectedTeams,
      devint: selectedDevint,
      startDate,
      endDate,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="animate-scale-in w-full max-w-md rounded-lg border border-gray-800 bg-black p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Book a Devint</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-300">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-gray-800 bg-black px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-300">
              Jira Link *
            </label>
            <input
              type="url"
              value={jiraLink}
              onChange={(e) => setJiraLink(e.target.value)}
              className="w-full rounded border border-gray-800 bg-black px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-300">
              Project Title *
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full rounded border border-gray-800 bg-black px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-300">
              Participants *
            </label>
            <input
              type="text"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className="w-full rounded border border-gray-800 bg-black px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter participant names"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-300">
              Teams Participating *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TEAMS.map((team) => (
                <label
                  key={team}
                  className={`flex cursor-pointer items-center gap-2 rounded border p-2 text-xs transition-all ${
                    selectedTeams.includes(team)
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                      : 'border-gray-800 bg-black text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTeams.includes(team)}
                    onChange={() => handleTeamToggle(team)}
                    className="h-3 w-3 cursor-pointer"
                  />
                  <span>{team}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-300">
              Available Devints *
            </label>
            <select
              value={selectedDevint}
              onChange={(e) => setSelectedDevint(e.target.value)}
              className="w-full rounded border border-gray-800 bg-black px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="" className="bg-black">Select a devint</option>
              {AVAILABLE_DEVINTS.map((devint) => (
                <option key={devint} value={devint} className="bg-black">
                  {devint}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-300">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                disabled
                className="w-full rounded border border-gray-800 bg-black/50 px-3 py-1.5 text-sm text-gray-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-300">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                disabled
                className="w-full rounded border border-gray-800 bg-black/50 px-3 py-1.5 text-sm text-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-800 bg-black px-4 py-1.5 text-sm font-medium text-gray-300 hover:bg-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Book Devint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
