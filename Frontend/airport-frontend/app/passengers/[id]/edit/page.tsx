'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPassengerById, updatePassenger } from '../../../lib/apiPassenger';
import { Passenger } from '../../../types/Passenger';

export default function EditPassengerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<Passenger | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const passenger = await getPassengerById(id);
        setForm(passenger);
      } catch (err: any) {
        setError(err.message ?? 'Failed to load passenger');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      load();
    }
  }, [id]);

  const handleChange = (field: keyof Passenger, value: string) => {
    if (form) {
      setForm(prev => prev ? { ...prev, [field]: value || null } : null);
    }
  };

  const validate = (): boolean => {
    if (!form) return false;
    if (!form.passportID.trim()) {
      setError('Passport ID is required');
      return false;
    }
    if (!form.firstName.trim()) {
      setError('First Name is required');
      return false;
    }
    if (!form.lastName.trim()) {
      setError('Last Name is required');
      return false;
    }
    if (form.email && !form.email.includes('@')) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!form) return;

    setError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      await updatePassenger(id, form);
      router.push('/passengers');
    } catch (err: any) {
      setError(err.message ?? 'Update failed');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 24, maxWidth: 600 }}>
        <h1>Edit Passenger</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error && !form) {
    return (
      <main style={{ padding: 24, maxWidth: 600 }}>
        <h1>Edit Passenger</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={() => router.push('/passengers')}>Back</button>
      </main>
    );
  }

  if (!form) {
    return (
      <main style={{ padding: 24, maxWidth: 600 }}>
        <h1>Edit Passenger</h1>
        <p>Passenger not found</p>
        <button onClick={() => router.push('/passengers')}>Back</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>Edit Passenger</h1>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => router.push('/passengers')}>Back</button>
      </div>

      {error && (
        <div style={{ padding: 12, backgroundColor: '#ffebee', color: '#c62828', marginBottom: 16, borderRadius: 4 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Passenger ID
          </label>
          <input
            type="text"
            value={form.passengerID}
            disabled
            style={{ width: '100%', padding: 8, fontSize: '14px', backgroundColor: '#f5f5f5', color: '#666' }}
          />
          <small style={{ color: '#666' }}>ID cannot be changed</small>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Passport ID <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            value={form.passportID}
            placeholder="Passport ID"
            required
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('passportID', e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            First Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            placeholder="First Name"
            required
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('firstName', e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Middle Name
          </label>
          <input
            type="text"
            value={form.middleName || ''}
            placeholder="Middle Name (optional)"
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('middleName', e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Last Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            value={form.lastName}
            placeholder="Last Name"
            required
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('lastName', e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Nation
          </label>
          <input
            type="text"
            value={form.nation || ''}
            placeholder="Nationality (optional)"
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('nation', e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>
            Email
          </label>
          <input
            type="email"
            value={form.email || ''}
            placeholder="Email (optional)"
            style={{ width: '100%', padding: 8, fontSize: '14px' }}
            onChange={e => handleChange('email', e.target.value)}
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
          {submitting ? 'Updating...' : 'Update Passenger'}
        </button>
      </div>
    </main>
  );
}

