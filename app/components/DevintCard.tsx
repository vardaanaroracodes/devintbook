'use client';

import { useState } from 'react';
import DeployPopup from './DeployPopup';
import DetailsPopup from './DetailsPopup';

interface DevintCardProps {
  name: string;
  bookingData?: any;
  onUnBook?: () => void;
  onDeploySuccess?: () => void;
}

export default function DevintCard({ name, bookingData, onUnBook, onDeploySuccess }: DevintCardProps) {
  const [showDeployButton, setShowDeployButton] = useState(false);
  const [showDeployPopup, setShowDeployPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  return (
    <>
      <div
        className="group relative flex items-center justify-between rounded-lg border border-gray-800 bg-black p-4 transition-all hover:border-gray-700 hover:bg-gray-900"
        onMouseEnter={() => setShowDeployButton(true)}
        onMouseLeave={() => setShowDeployButton(false)}
      >
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-base font-semibold text-white">{name}</h3>
            {bookingData && (
              <p className="text-sm text-gray-400 mt-1">{bookingData.projectTitle}</p>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDetailsPopup(true)}
              className="text-sm text-blue-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-blue-300"
            >
              Details
            </button>
          </div>
        </div>
        {showDeployButton && (
          <button
            onClick={() => setShowDeployPopup(true)}
            className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Deploy
          </button>
        )}
      </div>

      {showDeployPopup && (
        <DeployPopup
          devintName={name}
          onClose={() => setShowDeployPopup(false)}
          onSuccess={onDeploySuccess || (() => {})}
        />
      )}

      {showDetailsPopup && (
        <DetailsPopup 
          onClose={() => setShowDetailsPopup(false)}
          bookingData={bookingData}
          onUnBook={onUnBook}
        />
      )}
    </>
  );
}

