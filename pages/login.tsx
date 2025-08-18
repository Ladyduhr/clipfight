import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

/**
 * Login page allowing users to sign in with email/password or via Twitch. On
 * successful sign-in the user is redirected to the dashboard.
 */
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError('Ungültige Anmeldedaten');
    } else {
      router.push('/dashboard');
    }
  };

  const handleTwitchSignIn = () => {
    signIn('twitch');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-center">Anmelden</h1>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm">E-Mail</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 p-2 text-gray-100 focus:border-purple-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm">Passwort</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 p-2 text-gray-100 focus:border-purple-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium text-white"
          >
            Einloggen
          </button>
        </form>
        <button
          onClick={handleTwitchSignIn}
          className="w-full py-2 px-4 border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg font-medium mt-2"
        >
          Mit Twitch verbinden
        </button>
        <p className="text-center text-sm">
          Noch kein Konto?{' '}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300 underline">
            Registrieren
          </Link>
        </p>
      </div>
    </div>
  );
}
