'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type FieldConfig = {
  name: string;       // tên field trong JSON
  label: string;      // label hiển thị
  placeholder?: string;
};

type EntityNewPageProps = {
  title: string;
  apiPath: string;      // POST đến đâu, ví dụ: "/api/passengers"
  backHref: string;     // quay lại list
  fields: FieldConfig[];
};

export default function EntityNewPage(props: EntityNewPageProps) {
  const { title, apiPath, backHref, fields } = props;
  const router = useRouter();

  const [form, setForm] = useState<Record<string, string>>(
    () =>
      fields.reduce((acc, f) => {
        acc[f.name] = '';
        return acc;
      }, {} as Record<string, string>)
  );

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    try {
      setSubmitting(true);
      const res = await fetch(`http://localhost:7070${apiPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('Create success');
        router.push(backHref);
      } else {
        const text = await res.text();
        alert('Create failed: ' + text);
      }
    } catch (err: any) {
      alert('Create failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>{title}</h1>

      <div style={{ margin: '12px 0' }}>
        <button type="button" onClick={() => router.push(backHref)}>
          Back
        </button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {fields.map(f => (
          <div key={f.name}>
            <div style={{ fontWeight: 'bold' }}>{f.label}</div>
            <input
              style={{ width: '100%', padding: 4 }}
              placeholder={f.placeholder ?? f.label}
              value={form[f.name]}
              onChange={e => handleChange(f.name, e.target.value)}
            />
          </div>
        ))}

        <button type="button" onClick={submit} disabled={submitting}>
          {submitting ? 'Creating...' : 'Create'}
        </button>
      </div>
    </main>
  );
}
