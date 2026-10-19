'use client';

import React, { useState } from 'react';

// Define our screen states for the single-file view machine
type AuthScreen = 'login' | 'signup' | 'reset-password';

export default function UnifiedAuthPage() {
  // Screen views state manager
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');

  // Input field form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Feedback alert message states
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Helper helper to clear alert banners when clicking links to swap screens
  const navigateTo = (screen: AuthScreen) => {
    setCurrentScreen(screen);
    setErrorMsg('');
    setSuccessMsg('');
    setPassword('');
    setConfirmPassword('');
  };

  // Form submit operations handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // --- VIEW 1: LOGIN ACTIONS ---
    if (currentScreen === 'login') {
      if (!email || !password) {
        setErrorMsg('Please enter both your email address and password.');
        setIsLoading(false);
        return;
      }
      setSuccessMsg('Successfully authenticated! Redirecting to workspace suite...');
      setIsLoading(false);
    }

    // --- VIEW 2: SIGN UP ACTIONS ---
    if (currentScreen === 'signup') {
      if (!email || !password || !confirmPassword) {
        setErrorMsg('All registration fields are strictly required.');
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Form validation failed: Passwords do not match.');
        setIsLoading(false);
        return;
      }
      // Applies your specific DEV environment default parameter requirement rule
      setSuccessMsg('Account registration accepted! System default profile rule applied: superadmin.');
      setIsLoading(false);
    }

    // --- VIEW 3: PASSWORD RESET ACTIONS ---
    if (currentScreen === 'reset-password') {
      if (!email) {
        setErrorMsg('Please enter your account email address to continue.');
        setIsLoading(false);
        return;
      }
      setSuccessMsg('Reset validation complete! Check your inbox for a secure token link.');
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-4 dark:bg-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950">
        
        {/* ============================================================== */}
        {/* DYNAMIC FORM HEADERS DISPLAY                                   */}
        {/* ============================================================== */}
        {currentScreen === 'login' && (
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Lovelace Company Management System</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Login to your superadmin account</p>
          </div>
        )}

        {currentScreen === 'signup' && (
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Lovelace Company Management System</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sign up below to configure your instance.
            </p>
          </div>
        )}

        {currentScreen === 'reset-password' && (
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Reset Password</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Provide your email address to receive a secured verification recovery link</p>
          </div>
        )}

        {/* ============================================================== */}
        {/* DYNAMIC SYSTEM ALERT BANNERS                                   */}
        {/* ============================================================== */}
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

        {/* ============================================================== */}
        {/* THE CORE UNIFIED INTERACTION FORM                              */}
        {/* ============================================================== */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Universal Field: Account Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
              Email Address
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

          {/* Conditional Field: Password (Only shows on Login and Sign Up) */}
          {(currentScreen === 'login' || currentScreen === 'signup') && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
                  Password
                </label>
                {currentScreen === 'login' && (
                  <button
                    type="button"
                    onClick={() => navigateTo('reset-password')}
                    className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400 focus:outline-none"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-800 dark:text-slate-50 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
          )}

          {/* Conditional Field: Confirm Password (Only shows on Sign Up) */}
          {currentScreen === 'signup' && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-slate-800 dark:text-slate-50 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
          )}

          {/* Unified Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isLoading ? 'Processing Request...' : (
              currentScreen === 'login' ? 'Sign In' : 
              currentScreen === 'signup' ? 'Sign Up' : 'Send Recovery Link'
            )}
          </button>
        </form>
        {/* ============================================================== */}
        {/* DYNAMIC DESK-LINK ACTION NAVIGATION FOOTERS                    */}
        {/* ============================================================== */}
        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {currentScreen === 'login' && (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigateTo('signup')}
                className="font-medium text-blue-600 hover:underline dark:text-blue-400 focus:outline-none"
              >
                Sign up here
              </button>
            </>
          )}

          {currentScreen === 'signup' && (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="font-medium text-blue-600 hover:underline dark:text-blue-400 focus:outline-none"
              >
                Log In
              </button>
            </>
          )}

          {currentScreen === 'reset-password' && (
            <button
              type="button"
              onClick={() => navigateTo('login')}
              className="font-medium text-blue-600 hover:underline dark:text-blue-400 focus:outline-none"
            >
              Return to login
            </button>
          )}
        </div>
      </div>
    </main>
  );
}