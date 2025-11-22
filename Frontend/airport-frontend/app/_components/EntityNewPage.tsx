'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '../lib/apiClient';

export type FieldType = 'text' | 'number' | 'date';

export type FieldConfig = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: FieldType;
};

type EntityNewPageProps = {
  title: string;
  apiPath: string;
  backHref: string;
  fields: FieldConfig[];
};

export default function EntityNewPage(props: EntityNewPageProps) {
  const { title, apiPath, backHref, fields } = props;
  const router = useRouter();

  const [form, setForm] = useState<Record<string, any>>(
    () =>
      fields.reduce((acc, f) => {
        acc[f.name] = '';
        return acc;
      }, {} as Record<string, any>)
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: string, type?: FieldType) => {
    let v: any = value;
    if (type === 'number' && value !== '') {
      v = Number(value);
    }
    setForm(prev => ({ ...prev, [name]: v }));
  };

  const submit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await apiPost(apiPath, form);
      router.push(backHref);
    } catch (err: any) {
      const msg = err?.message || 'Unknown error';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="p-6 max-w-xl space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <button
          type="button"
          onClick={() => router.push(backHref)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="space-y-3">
        {fields.map(f => (
          <div key={f.name} className="flex flex-col gap-1">
            <label className="font-medium">
              {f.label}
              {f.required && <span className="text-red-500"> *</span>}
            </label>
            <input
              type={f.type ?? 'text'}
              required={f.required}
              placeholder={f.placeholder ?? f.label}
              className="border rounded px-2 py-1"
              value={form[f.name] ?? ''}
              onChange={e => handleChange(f.name, e.target.value, f.type)}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Creating...' : 'Create'}
        </button>
      </div>
    </main>
  );
}
