'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createTicket } from '../../lib/apiTicket';
import { Ticket, TicketClass } from '../../types/Ticket';

export default function NewTicketPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const passengerIdFromQuery = searchParams.get('passengerID');

  const [form, setForm] = useState<Omit<Ticket, 'ticketID'>>({
    passengerID: passengerIdFromQuery || '',
    flightID: '',
    seat: '',
    classType: 'Economy' as TicketClass,
    purchaseDate: new Date().toISOString().slice(0, 16), // Format for datetime-local input
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    if (!form.passengerID.trim()) {
      setError('Passenger ID is required');
      return false;
    }
    if (!form.flightID.trim()) {
      setError('Flight ID is required');
      return false;
    }
    if (!form.seat.trim()) {
      setError('Seat is required');
      return false;
    }
    if (!form.classType) {
      setError('Class is required');
      return false;
    }
    return true;
  };

  const submit = async () => {
    setError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      // Convert datetime-local format to ISO string
      const purchaseDateISO = new Date(form.purchaseDate).toISOString();
      await createTicket({
        ...form,
        purchaseDate: purchaseDateISO,
      });
      router.push('/tickets');
    } catch (err: any) {
      setError(err.message ?? 'Create failed');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>New Ticket</h1>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => router.push('/tickets')}>Back</button>
      </div>

      {error && (
        <div style={{ padding: 12, backgroundColor: '#ffebee', color: '#c62828', marginBottom: 16, borderRadius: 4 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Passenger ID <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            value={form.passengerID}
            placeholder="PA00001"
            required
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('passengerID', e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Flight ID <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            value={form.flightID}
            placeholder="FL00001"
            required
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('flightID', e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Seat <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            value={form.seat}
            placeholder="12A"
            required
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('seat', e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Class <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            value={form.classType}
            required
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('classType', e.target.value as TicketClass)}
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Purchase Date <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="datetime-local"
            value={form.purchaseDate}
            required
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('purchaseDate', e.target.value)}
          />
        </div>

        <button
          onClick={submit}
          disabled={submitting}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: submitting ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? 'Creating...' : 'Create Ticket'}
        </button>
      </div>
    </main>
  );
}
