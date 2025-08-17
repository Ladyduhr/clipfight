import { useSession, signIn, signOut } from 'next-auth/react';
import Prototype from '../components/Prototype';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="p-8">Lade...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">ClipFight</h1>
        <button
          onClick={() => signIn('twitch')}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Mit Twitch anmelden
        </button>
      </div>
    );
  }

  return <Prototype />;
}
