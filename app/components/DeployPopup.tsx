'use client';

import { useState } from 'react';

interface DeployPopupProps {
  devintName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeployPopup({ devintName, onClose, onSuccess }: DeployPopupProps) {
  const [tag, setTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock deploy action
    console.log('Deploying', devintName, 'with tag:', tag);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="animate-scale-in w-full max-w-md rounded-lg border border-gray-800 bg-black p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Deploy {devintName}</h2>
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="tag"
              className="mb-1 block text-xs font-medium text-gray-300"
            >
              Tag
            </label>
            <input
              id="tag"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full rounded border border-gray-800 bg-black px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter tag"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
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
              Deploy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

