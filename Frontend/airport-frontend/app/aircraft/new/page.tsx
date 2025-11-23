'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAircraft } from '../../lib/apiAircraft';
import { Aircraft } from '../../types/Aircraft';

export default function NewAircraftPage() {
  const router = useRouter();

  // Form state (aircraftID is not required for creation)
  const [form, setForm] = useState<Omit<Aircraft, 'aircraftID'>>({
    registrationNum: '',
    model: '',
    capacity: 0,
    airline: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form, value: string | number) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = (): boolean => {
    if (!form.registrationNum.trim()) {
      setError('Registration Number is required');
      return false;
    }
    if (!form.model.trim()) {
      setError('Model is required');
      return false;
    }
    if (!form.airline.trim()) {
      setError('Airline is required');
      return false;
    }
    if (form.capacity <= 0) {
      setError('Capacity must be greater than 0');
      return false;
    }
    return true;
  };

  const submit = async () => {
    setError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      await createAircraft(form);
      router.push('/aircraft');
    } catch (err: any) {
      setError(err.message ?? 'Create failed');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>New Aircraft</h1>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => router.push('/aircraft')}>Back</button>
      </div>

      {error && (
        <div
          style={{
            padding: 12,
            backgroundColor: '#ffebee',
            color: '#c62828',
            marginBottom: 16,
            borderRadius: 4,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: 16 }}>
        
        {/* Registration Number */}
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: 4, display: 'block' }}>
            Registration Number <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="VN-A123"
            value={form.registrationNum}
            style={{ width: '100%', padding: 8 }}
            onChange={e => handleChange('registrationNum', e.target.value)}
          />
        </div>

        {/* Model */}
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: 4, display: 'block' }}>
            Model <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Airbus A321 / Boeing 787"
            value={form.model}
            style={{ width: '100%', padding: 8 }}
            onChange={e => handleChange('model', e.target.value)}
          />
        </div>

        {/* Capacity */}
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: 4, display: 'block' }}>
            Capacity <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            placeholder="180"
            value={form.capacity}
            style={{ width: '100%', padding: 8 }}
            onChange={e => handleChange('capacity', Number(e.target.value))}
          />
        </div>

        {/* Airline */}
        <div>
          <label style={{ fontWeight: 'bold', marginBottom: 4, display: 'block' }}>
            Airline <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Vietnam Airlines / Bamboo Airways"
            value={form.airline}
            style={{ width: '100%', padding: 8 }}
            onChange={e => handleChange('airline', e.target.value)}
          />
        </div>

        {/* Submit button */}
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
          {submitting ? 'Creating...' : 'Create Aircraft'}
        </button>
      </div>
    </main>
  );
}
