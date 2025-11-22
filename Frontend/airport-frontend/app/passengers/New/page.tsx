'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPassengerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    passengerID: '',
    passportID: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nation: '',
    email: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:7070/api/passengers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('Create success');
        router.push('/passengers');
      } else {
        const msg = await res.text();
        alert('Create failed: ' + msg);
      }
    } catch (err) {
      alert('Create failed');
    }

    setSubmitting(false);
  };

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>New Passenger</h1>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => router.push('/passengers')}>Back</button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
              {key}
            </label>
            <input
              value={value}
              placeholder={key}
              style={{ width: '100%', padding: 6 }}
              onChange={e => handleChange(key, e.target.value)}
            />
          </div>
        ))}

        <button onClick={submit} disabled={submitting}>
          {submitting ? 'Creating...' : 'Create'}
        </button>
      </div>
    </main>
  );
}
