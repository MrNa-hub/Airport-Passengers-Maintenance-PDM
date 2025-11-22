'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiGet } from '../lib/apiClient';

export type ColumnConfig<T> = {
  key: keyof T;
  label: string;
};

type EntityListPageProps<T> = {
  title: string;
  apiPath: string;     // ví dụ: "/passengers"
  columns: ColumnConfig<T>[];
  newHref?: string;    // ví dụ: "/passengers/new"
};

export default function EntityListPage<T extends Record<string, any>>(
  props: EntityListPageProps<T>
) {
  const { title, apiPath, columns, newHref } = props;

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const json = await apiGet(apiPath); 
      setData(json);
    } catch (err: any) {
      setError(err.message ?? 'Load failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>

        <div className="space-x-2">
          <button
            onClick={load}
            disabled={loading}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            {loading ? 'Loading...' : 'Reload'}
          </button>

          {newHref && (
            <Link href={newHref}>
              <button className="px-3 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700">
                New
              </button>
            </Link>
          )}
        </div>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map(col => (
              <th
                key={String(col.key)}
                className="border px-2 py-1 text-left"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map(col => (
                <td key={String(col.key)} className="border px-2 py-1">
                  {String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}

          {data.length === 0 && !loading && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center border px-2 py-4"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
