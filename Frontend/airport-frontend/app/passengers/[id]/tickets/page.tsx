'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getPassengerById } from '../../../lib/apiPassenger';
import { getTicketsByPassengerId } from '../../../lib/apiTicket';
import { Passenger } from '../../../types/Passenger';
import { Ticket } from '../../../types/Ticket';

export default function PassengerTicketsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [p, t] = await Promise.all([
          getPassengerById(id),
          getTicketsByPassengerId(id),
        ]);
        setPassenger(p);
        setTickets(t);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? 'Failed to load passenger tickets');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const formatDate = (value: string | null | undefined) => {
    if (!value) return '-';
    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Passenger Tickets</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => router.push('/passengers')}>Back to Passengers</button>
      </main>
    );
  }

  if (!passenger) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Passenger Tickets</h1>
        <p>Passenger not found</p>
        <button onClick={() => router.push('/passengers')}>Back to Passengers</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <button
        onClick={() => router.push('/passengers')}
        style={{ marginBottom: 16 }}
      >
        ← Back to Passengers
      </button>

      <h1>Tickets of {passenger.firstName} {passenger.lastName}</h1>
      <p>
        Passenger ID: {passenger.passengerID} – Passport: {passenger.passportID}
      </p>

      {tickets.length === 0 ? (
        <p style={{ marginTop: 24 }}>This passenger has no tickets.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: 24,
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Ticket ID</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Flight ID</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Seat</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Class</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Status</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Purchase Date</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.ticketID}>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{t.ticketID}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{t.flightID}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{(t as any).seatNumber ?? (t as any).seat}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{(t as any).ticketClass ?? (t as any).classType}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{(t as any).status ?? '-'}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>
                  {formatDate(t.purchaseDate as any)}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>
                  <Link href={`/tickets/${t.ticketID}/luggage`}>
                    <button style={{ padding: '4px 8px', fontSize: '12px' }}>
                      View Luggage
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
