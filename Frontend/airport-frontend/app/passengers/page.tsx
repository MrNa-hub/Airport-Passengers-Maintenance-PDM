'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllPassengers, deletePassenger } from '../lib/apiPassenger';
import { Passenger } from '../types/Passenger';

export default function PassengersPage() {
  const router = useRouter();
  const [data, setData] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const passengers = await getAllPassengers();
      setData(passengers);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load passengers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete passenger ${id}?`)) {
      return;
    }

    try {
      await deletePassenger(id);
      await load(); // Reload after delete
    } catch (err: any) {
      alert('Delete failed: ' + (err.message ?? 'Unknown error'));
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Passengers</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Passengers</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={load}>Retry</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1>Passengers</h1>
        <div>
          <button onClick={load} style={{ marginRight: 8 }}>Reload</button>
          <Link href="/passengers/New">
            <button>New Passenger</button>
          </Link>
        </div>
      </div>

      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>PassengerID</th>
            <th>Passport</th>
            <th>Name</th>
            <th>Nation</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: 20 }}>
                No passengers found
              </td>
            </tr>
          ) : (
            data.map((p) => (
              <tr key={p.passengerID}>
                <td>{p.passengerID}</td>
                <td>{p.passportID}</td>
                <td>
                  {[p.firstName, p.middleName, p.lastName]
                    .filter(Boolean)
                    .join(' ')}
                </td>
                <td>{p.nation ?? '-'}</td>
                <td>{p.email ?? '-'}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={`/passengers/${p.passengerID}/tickets`}>
                      <button style={{ padding: '4px 8px', fontSize: '12px' }}>Tickets</button>
                    </Link>
                    <Link href={`/passengers/${p.passengerID}/edit`}>
                      <button style={{ padding: '4px 8px', fontSize: '12px' }}>Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(p.passengerID)}
                      style={{ padding: '4px 8px', fontSize: '12px', backgroundColor: '#ff4444', color: 'white', border: 'none', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
