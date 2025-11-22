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
        setError(err.message ?? 'Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      load();
    }
  }, [id]);

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
        <h1>Passenger Tickets</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Passenger Tickets</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
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

  const fullName = [passenger.firstName, passenger.middleName, passenger.lastName]
    .filter(Boolean)
    .join(' ');

  return (
    <main style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => router.push('/passengers')} style={{ marginBottom: 16 }}>
          ← Back to Passengers
        </button>
        <h1>Tickets for Passenger</h1>
        <div style={{ backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8, marginTop: 16 }}>
          <p><strong>ID:</strong> {passenger.passengerID}</p>
          <p><strong>Name:</strong> {fullName}</p>
          <p><strong>Passport:</strong> {passenger.passportID}</p>
          <p><strong>Email:</strong> {passenger.email ?? '-'}</p>
          <p><strong>Nation:</strong> {passenger.nation ?? '-'}</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Tickets ({tickets.length})</h2>
        <Link href={`/tickets/new?passengerID=${passenger.passengerID}`}>
          <button>Create Ticket for This Passenger</button>
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: 8 }}>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: 16 }}>No tickets found for this passenger</p>
          <Link href={`/tickets/new?passengerID=${passenger.passengerID}`}>
            <button>Create First Ticket</button>
          </Link>
        </div>
      ) : (
        <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th>TicketID</th>
              <th>FlightID</th>
              <th>Seat</th>
              <th>Class</th>
              <th>Purchase Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.ticketID}>
                <td>{t.ticketID}</td>
                <td>{t.flightID}</td>
                <td>{t.seat}</td>
                <td>{t.classType}</td>
                <td>{formatDate(t.purchaseDate)}</td>
                <td>
                  <Link href={`/tickets/${t.ticketID}/luggage`}>
                    <button style={{ padding: '4px 8px', fontSize: '12px' }}>View Luggage</button>
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

