'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (!email) {
      setErrorMsg('Please enter your account email address.');
      setIsLoading(false);
      return;
    }

    setSuccessMsg('Recovery link sent successfully! Please inspect your email inbox.');
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-4 dark:bg-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950">
        
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Reset Password
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Provide your administrative email handle to receive a secured verification recovery link
          </p>
        </div>

        {errorMsg && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-600 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleReset} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
              Account Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-800 dark:text-slate-50 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isLoading ? 'Sending Link...' : 'Send Recovery Link'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link 
            href="/login" 
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Return to login interface
          </Link>
        </div>

      </div>
    </main>
  );
}
