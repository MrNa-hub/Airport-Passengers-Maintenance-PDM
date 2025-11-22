'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPassengerTravelHistory } from '../../lib/apiPassengerTravelHistory';
import { PassengerTravelHistory } from '../../types/PassengerTravelHistory';

export default function NewPassengerTravelHistoryPage() {
  const router = useRouter();
  const [form, setForm] = useState<PassengerTravelHistory>({
    passengerID: '',
    travelHistory: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof PassengerTravelHistory, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    if (!form.passengerID.trim()) {
      setError('Passenger ID is required');
      return false;
    }
    if (!form.travelHistory.trim()) {
      setError('Travel history is required');
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
      await createPassengerTravelHistory(form);
      router.push('/passenger-travel-histories');
    } catch (err: any) {
      setError(err.message ?? 'Create failed');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>New Passenger Travel History</h1>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => router.push('/passenger-travel-histories')}>Back</button>
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
            Travel History <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            value={form.travelHistory}
            placeholder="e.g., SGN-LAX-NYC or Vietnam to USA via Los Angeles"
            required
            rows={4}
            style={{ width: '100%', padding: 8, fontSize: '14px', fontFamily: 'inherit' }}
            onChange={e => handleChange('travelHistory', e.target.value)}
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
          {submitting ? 'Creating...' : 'Create Travel History'}
        </button>
      </div>
    </main>
  );
}
