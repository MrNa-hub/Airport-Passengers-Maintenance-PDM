'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllAircraft, deleteAircraft } from '../lib/apiAircraft';
import { Aircraft } from '../types/Aircraft';

export default function AircraftPage() {
  const router = useRouter();
  const [data, setData] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const aircrafts = await getAllAircraft();
      setData(aircrafts);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load aircraft');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete aircraft ${id}?`)) return;

    try {
      await deleteAircraft(id);
      await load();
    } catch (err: any) {
      alert('Delete failed: ' + (err.message ?? 'Unknown error'));
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Aircraft</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Aircraft</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={load}>Retry</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>Aircraft</h1>
        <div>
          <button onClick={load} style={{ marginRight: 8 }}>Reload</button>
          <Link href="/aircraft/new">
            <button>New Aircraft</button>
          </Link>
        </div>
      </div>

      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>ID</th>
            <th>Registration</th>
            <th>Model</th>
            <th>Capacity</th>
            <th>Airline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: 20 }}>
                No aircraft found
              </td>
            </tr>
          ) : (
            data.map(a => (
              <tr key={a.aircraftID}>
                <td>{a.aircraftID}</td>
                <td>{a.registrationNum}</td>
                <td>{a.model}</td>
                <td>{a.capacity}</td>
                <td>{a.airline}</td>
                <td>
                  <button
                    onClick={() => handleDelete(a.aircraftID)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer'
                    }}
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
