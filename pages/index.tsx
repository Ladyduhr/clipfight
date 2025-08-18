import { useSession } from 'next-auth/react';
import Prototype from '../components/Prototype';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="p-8">Lade...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4 space-y-4">
        <h1 className="text-4xl font-bold mb-2">ClipFight</h1>
        <p className="text-center max-w-md mb-4">Erstelle ein Konto oder melde dich an, um deine Events zu verwalten und Twitch zu verbinden.</p>
        <div className="flex space-x-4">
          <Link
            href="/signup"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
          >
            Registrieren
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-md"
          >
            Anmelden
          </Link>
        </div>
      </div>
    );
  }

  return <Prototype />;
}
