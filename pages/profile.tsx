import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

/**
 * Simple profile page showing user info and a button to link Twitch. If the user
 * is not signed in, they are prompted to log in.
 */
export default function Profile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="p-8 text-gray-100">Lade…</p>;
  }
  if (!session) {
    return (
      <div className="p-8 min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
        <p className="mb-4">Du musst eingeloggt sein, um dein Profil zu sehen.</p>
        <Link href="/login" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white">
          Zur Anmeldung
        </Link>
      </div>
    );
  }
  const user = session.user as any;
  const linked = !!user.twitchUsername;
  return (
    <div className="p-8 min-h-screen bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Dein Profil</h1>
      <p><strong>Email:</strong> {session.user?.email}</p>
      {user?.name && <p><strong>Name:</strong> {user.name}</p>}
      {linked ? (
        <p><strong>Twitch verknüpft:</strong> {user.twitchUsername}</p>
      ) : (
        <div className="mt-4">
          <p className="mb-2">Dein Twitch Account ist noch nicht verknüpft.</p>
          <button
            onClick={() => signIn('twitch')}
            className="px-4 py-2 border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-md"
          >
            Twitch verbinden
          </button>
        </div>
      )}
      <div className="mt-8">
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
        >
          Abmelden
        </button>
      </div>
    </div>
  );
}
