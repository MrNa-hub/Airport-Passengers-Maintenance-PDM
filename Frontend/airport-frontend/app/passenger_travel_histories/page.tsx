'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllPassengerTravelHistories, deletePassengerTravelHistory } from '../lib/apiPassengerTravelHistory';
import { PassengerTravelHistory } from '../types/PassengerTravelHistory';

export default function PassengerTravelHistoriesPage() {
  const router = useRouter();
  const [data, setData] = useState<PassengerTravelHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const histories = await getAllPassengerTravelHistories();
      setData(histories);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load passenger travel histories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (passengerId: string, travelHistory: string) => {
    if (!confirm(`Are you sure you want to delete this travel history?`)) {
      return;
    }

    try {
      await deletePassengerTravelHistory(passengerId, travelHistory);
      await load(); // Reload after delete
    } catch (err: any) {
      alert('Delete failed: ' + (err.message ?? 'Unknown error'));
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Passenger Travel Histories</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Passenger Travel Histories</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={load}>Retry</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1>Passenger Travel Histories</h1>
        <div>
          <button onClick={load} style={{ marginRight: 8 }}>Reload</button>
          <Link href="/passenger-travel-histories/new">
            <button>New Travel History</button>
          </Link>
        </div>
      </div>

      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>PassengerID</th>
            <th>Travel History</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: 20 }}>
                No travel histories found
              </td>
            </tr>
          ) : (
            data.map((t, idx) => (
              <tr key={`${t.passengerID}-${t.travelHistory}-${idx}`}>
                <td>{t.passengerID}</td>
                <td style={{ maxWidth: 400, wordWrap: 'break-word' }}>{t.travelHistory}</td>
                <td>
                  <button
                    onClick={() => handleDelete(t.passengerID, t.travelHistory)}
                    style={{ padding: '4px 8px', fontSize: '12px', backgroundColor: '#ff4444', color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
