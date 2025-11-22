'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPassengerPhoneNum } from '../../lib/apiPassengerPhoneNum';
import { PassengerPhoneNum } from '../../types/PassengerPhoneNum';

export default function NewPassengerPhoneNumPage() {
  const router = useRouter();
  const [form, setForm] = useState<PassengerPhoneNum>({
    passengerID: '',
    phoneNum: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof PassengerPhoneNum, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    if (!form.passengerID.trim()) {
      setError('Passenger ID is required');
      return false;
    }
    if (!form.phoneNum.trim()) {
      setError('Phone number is required');
      return false;
    }
    // Basic phone validation
    const phoneRegex = /^[\+]?[0-9]+$/;
    if (!phoneRegex.test(form.phoneNum.replace(/\s/g, ''))) {
      setError('Invalid phone number format');
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
      await createPassengerPhoneNum(form);
      router.push('/passenger-phone-nums');
    } catch (err: any) {
      setError(err.message ?? 'Create failed');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>New Passenger Phone Number</h1>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => router.push('/passenger-phone-nums')}>Back</button>
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
            Phone Number <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            value={form.phoneNum}
            placeholder="+84123456789 or 0123456789"
            required
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('phoneNum', e.target.value)}
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
          {submitting ? 'Creating...' : 'Create Phone Number'}
        </button>
      </div>
    </main>
  );
}
