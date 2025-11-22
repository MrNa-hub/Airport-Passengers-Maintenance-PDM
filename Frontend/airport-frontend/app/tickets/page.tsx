'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllTickets, deleteTicket } from '../lib/apiTicket';
import { Ticket } from '../types/Ticket';

export default function TicketsPage() {
  const router = useRouter();
  const [data, setData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const tickets = await getAllTickets();
      setData(tickets);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load tickets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete ticket ${id}?`)) {
      return;
    }

    try {
      await deleteTicket(id);
      await load(); // Reload after delete
    } catch (err: any) {
      alert('Delete failed: ' + (err.message ?? 'Unknown error'));
      console.error(err);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Tickets</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Tickets</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={load}>Retry</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1>Tickets</h1>
        <div>
          <button onClick={load} style={{ marginRight: 8 }}>Reload</button>
          <Link href="/tickets/new">
            <button>New Ticket</button>
          </Link>
        </div>
      </div>

      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>TicketID</th>
            <th>PassengerID</th>
            <th>FlightID</th>
            <th>Seat</th>
            <th>Class</th>
            <th>Purchase Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: 20 }}>
                No tickets found
              </td>
            </tr>
          ) : (
            data.map((t) => (
              <tr key={t.ticketID}>
                <td>{t.ticketID}</td>
                <td>
                  <Link href={`/passengers/${t.passengerID}/tickets`} style={{ color: '#0070f3', textDecoration: 'underline' }}>
                    {t.passengerID}
                  </Link>
                </td>
                <td>{t.flightID}</td>
                <td>{t.seat}</td>
                <td>{t.classType}</td>
                <td>{formatDate(t.purchaseDate)}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={`/tickets/${t.ticketID}/luggage`}>
                      <button style={{ padding: '4px 8px', fontSize: '12px' }}>Luggage</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(t.ticketID)}
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
