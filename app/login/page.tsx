'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Mock allowed email - user will provide this
  const ALLOWED_EMAIL = 'vardaan@example.com'; // User can change this

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (email.toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
      setError('Invalid email. Please use the authorized email address.');
      return;
    }

    // Mock successful login
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-gray-800 bg-black p-6 shadow-xl">
        <div>
          <h2 className="text-center text-2xl font-semibold text-white">
            Sign in with SSO
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email to continue
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full rounded border border-gray-800 bg-black px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              placeholder="Email address"
            />
          </div>
          {error && (
            <div className="rounded border border-red-500/50 bg-red-500/20 p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none"
            >
              Sign in
            </button>
          </div>
          <p className="text-center text-xs text-gray-500">
            Mock SSO - Only {ALLOWED_EMAIL} is authorized
          </p>
        </form>
      </div>
    </div>
  );
}

