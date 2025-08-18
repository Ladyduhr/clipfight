import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Prototype() {
  // For now this component is a placeholder illustrating where event
  // configuration UI would live. In a real application this would include
  // various settings for clip sources, moderation rules, voting options, etc.
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert('Du musst eingeloggt sein, um ein Event zu erstellen.');
      return;
    }
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          startDate,
          endDate,
          userId: (session.user as any).id,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Fehler beim Speichern des Events');
      }
      alert('Event gespeichert');
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Neues Event erstellen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">
            Titel
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100 focus:border-purple-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="description">
            Beschreibung
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100 focus:border-purple-500 focus:outline-none"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="startDate">
              Startdatum
            </label>
            <input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="endDate">
              Enddatum
            </label>
            <input
              id="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Event speichern
        </button>
      </form>
    </div>
  );
}
