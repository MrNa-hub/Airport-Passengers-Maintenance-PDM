'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllPassengerPhoneNums, deletePassengerPhoneNum } from '../lib/apiPassengerPhoneNum';
import { PassengerPhoneNum } from '../types/PassengerPhoneNum';

export default function PassengerPhoneNumsPage() {
  const router = useRouter();
  const [data, setData] = useState<PassengerPhoneNum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const phoneNums = await getAllPassengerPhoneNums();
      setData(phoneNums);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load passenger phone numbers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (passengerId: string, phoneNum: string) => {
    if (!confirm(`Are you sure you want to delete phone number ${phoneNum}?`)) {
      return;
    }

    try {
      await deletePassengerPhoneNum(passengerId, phoneNum);
      await load(); // Reload after delete
    } catch (err: any) {
      alert('Delete failed: ' + (err.message ?? 'Unknown error'));
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Passenger Phone Numbers</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Passenger Phone Numbers</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={load}>Retry</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1>Passenger Phone Numbers</h1>
        <div>
          <button onClick={load} style={{ marginRight: 8 }}>Reload</button>
          <Link href="/passenger-phone-nums/new">
            <button>New Phone Number</button>
          </Link>
        </div>
      </div>

      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>PassengerID</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: 20 }}>
                No phone numbers found
              </td>
            </tr>
          ) : (
            data.map((p, idx) => (
              <tr key={`${p.passengerID}-${p.phoneNum}-${idx}`}>
                <td>{p.passengerID}</td>
                <td>{p.phoneNum}</td>
                <td>
                  <button
                    onClick={() => handleDelete(p.passengerID, p.phoneNum)}
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
