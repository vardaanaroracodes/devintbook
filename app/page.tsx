'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DevintCard from './components/DevintCard';
import BookDevintPopup from './components/BookDevintPopup';
import Toast from './components/Toast';

interface Booking {
  id: string;
  name: string;
  jiraLink: string;
  projectTitle: string;
  participants: string;
  teams: string[];
  devint: string;
  startDate: string;
  endDate: string;
  jiraStatus: string;
  devintOwner: string;
  status: string;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showBookPopup, setShowBookPopup] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      // Load bookings from localStorage
      const savedBookings = localStorage.getItem('bookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const handleBookClick = () => {
    if (bookings.length >= 2) {
      setToast({
        message: 'You cannot Book Devint - Maximum Limit Reached',
        type: 'error',
      });
      return;
    }
    setShowBookPopup(true);
  };

  const handleBook = (bookingData: any) => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      ...bookingData,
      jiraStatus: 'Ready for devint qa',
      devintOwner: 'vardaan',
      status: 'Ready for devint qa',
    };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setToast({
      message: 'Devint booked successfully!',
      type: 'success',
    });
  };

  const handleUnBook = (bookingId: string) => {
    const updatedBookings = bookings.filter((b) => b.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setToast({
      message: 'Devint un-booked successfully!',
      type: 'success',
    });
  };

  const handleDeploySuccess = () => {
    setToast({
      message: 'Deploy successful!',
      type: 'success',
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-lg text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <nav className="border-b border-gray-800 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Devint Booking</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleBookClick}
                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Book a Devint
              </button>
              <button
                onClick={handleLogout}
                className="rounded border border-gray-700 bg-black px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">My Devints</h2>
        </div>
        <div className="space-y-3">
          {bookings.length === 0 && (
            <DevintCard 
              name="devintam3" 
              onDeploySuccess={handleDeploySuccess}
            />
          )}
          {bookings.map((booking) => (
            <DevintCard
              key={booking.id}
              name={booking.devint}
              bookingData={booking}
              onUnBook={() => handleUnBook(booking.id)}
              onDeploySuccess={handleDeploySuccess}
            />
          ))}
        </div>
      </main>

      {showBookPopup && (
        <BookDevintPopup
          onClose={() => setShowBookPopup(false)}
          onBook={handleBook}
        />
      )}
    </div>
  );
}
