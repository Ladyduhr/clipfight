import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

interface Event {
  id: string;
  title: string;
  description?: string | null;
  startDate: string;
  endDate: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/events')
        .then((res) => res.json())
        .then((data) => setEvents(data));
    }
  }, [status]);

  if (status === 'loading') return <p className="p-8">Lade...</p>;
  if (!session) {
    return (
      <div className="p-8">
        <p>Du musst eingeloggt sein, um das Dashboard zu sehen.</p>
        <Link
          href="/login"
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Anmelden
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Deine Events</h1>
      {events.length === 0 ? (
        <p>Noch keine Events.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              {event.description && <p className="mt-2">{event.description}</p>}
              <p className="text-sm text-gray-500 mt-1">
                {new Date(event.startDate).toLocaleString()} – {new Date(event.endDate).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
