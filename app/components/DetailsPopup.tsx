'use client';

interface DetailsPopupProps {
  onClose: () => void;
  bookingData?: any;
  onUnBook?: () => void;
}

export default function DetailsPopup({ onClose, bookingData, onUnBook }: DetailsPopupProps) {
  // Use booking data if available, otherwise use default values
  const projectTitle = bookingData?.projectTitle || 'devintam3';
  const jiraStatus = bookingData?.jiraStatus || 'Ready for devint qa';
  const teamName = bookingData?.teams?.join(', ') || 'django';
  const devintOwner = bookingData?.devintOwner || 'vardaan';
  const status = bookingData?.status || 'Ready for devint qa';
  const startDate = bookingData?.startDate || '2024-01-15';
  const endDate = bookingData?.endDate || '2024-01-22';
  const jiraLink = bookingData?.jiraLink || '';
  const participants = bookingData?.participants || '';
  const name = bookingData?.name || '';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="animate-scale-in w-full max-w-lg rounded-lg border border-gray-800 bg-black p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Devint Details</h2>
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
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-gray-700 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-400">Project Title</span>
              <span className="text-sm font-medium text-white">{projectTitle}</span>
            </div>
            <span className="rounded-full bg-green-500/20 border border-green-500/50 px-2.5 py-1 text-xs font-medium text-green-400">
              {status}
            </span>
          </div>
          {name && (
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="text-xs font-medium text-gray-400">Name</span>
              <span className="text-sm text-gray-300">{name}</span>
            </div>
          )}
          {jiraLink && (
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="text-xs font-medium text-gray-400">Jira Link</span>
              <a href={jiraLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 underline">
                View Jira
              </a>
            </div>
          )}
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="text-xs font-medium text-gray-400">Jira Status</span>
            <span className="text-sm text-gray-300">{jiraStatus}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="text-xs font-medium text-gray-400">Team Name</span>
            <span className="text-sm text-gray-300">{teamName}</span>
          </div>
          {participants && (
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="text-xs font-medium text-gray-400">Participants</span>
              <span className="text-sm text-gray-300">{participants}</span>
            </div>
          )}
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="text-xs font-medium text-gray-400">Devint Owner</span>
            <span className="text-sm text-gray-300">{devintOwner}</span>
          </div>
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-medium text-gray-400">Period</span>
            <span className="text-sm text-gray-300">
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          {onUnBook && (
            <button
              onClick={() => {
                onUnBook();
                onClose();
              }}
              className="rounded border border-red-600 bg-red-600/20 px-4 py-1.5 text-sm font-medium text-red-400 hover:bg-red-600/30 transition-colors"
            >
              Un-Book
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

