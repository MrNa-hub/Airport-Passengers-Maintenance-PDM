'use client';

import { useEffect, useState } from 'react';

export type ColumnConfig = {
  key: string;   // tên field trong JSON
  label: string; // label hiển thị
};

type EntityListPageProps = {
  title: string;
  apiPath: string;          // ví dụ: "/api/passengers"
  columns: ColumnConfig[];
  newHref?: string;         // ví dụ: "/passengers/new"
};

export default function EntityListPage(props: EntityListPageProps) {
  const { title, apiPath, columns, newHref } = props;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:7070${apiPath}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      alert('Load data failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>{title}</h1>

      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <button onClick={load} disabled={loading}>
          {loading ? 'Loading...' : 'Reload'}
        </button>

        {newHref && (
          <a href={newHref}>
            <button style={{ marginLeft: 8 }}>New</button>
          </a>
        )}
      </div>

      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          marginTop: 8,
        }}
      >
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                style={{ border: '1px solid #ccc', padding: 4 }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td
                  key={col.key}
                  style={{ border: '1px solid #ccc', padding: 4 }}
                >
                  {String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}

          {data.length === 0 && !loading && (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  border: '1px solid #ccc',
                  padding: 8,
                  textAlign: 'center',
                }}
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
