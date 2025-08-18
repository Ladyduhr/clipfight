import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

/**
 * Signup page allowing users to create a local account. After successful signup
 * they are redirected to the login page.
 */
export default function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      setSuccess(true);
      // Redirect to login after short delay
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-center">Registrieren</h1>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {success && <p className="text-green-400 text-sm text-center">Konto erstellt! Du wirst weitergeleitet…</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm">Name (optional)</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 p-2 text-gray-100 focus:border-purple-500 focus:outline-none"
              placeholder="Dein Name"
            />
          </div>
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
            disabled={success}
          >
            Konto erstellen
          </button>
        </form>
        <p className="text-center text-sm">
          Schon ein Konto?{' '}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 underline">
            Anmelden
          </Link>
        </p>
      </div>
    </div>
  );
}
