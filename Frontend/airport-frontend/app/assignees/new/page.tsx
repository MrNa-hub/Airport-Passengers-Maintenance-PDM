'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFlights } from '../lib/api/Flight';
import { getEmployees } from '../lib/api/Employee';
import { createAssignee } from '../lib/api/Assignee';
import type { Flight } from '../types/Flight';
import type { Employee } from '../types/Employee';

export default function NewAssigneePage() {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [flightID, setFlightID] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [f, e] = await Promise.all([getFlights(), getEmployees()]);
        setFlights(f);
        setEmployees(e);
      } catch (err) {
        setError('Failed to load flights or employees');
      }
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createAssignee({ employeeID, flightID });
      router.push('/assignees');
    } catch (err) {
      setError('Failed to create assignee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>New Assignee</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Flight</label>
          <select
            value={flightID}
            onChange={e => setFlightID(e.target.value)}
            required
          >
            <option value="">Select a flight</option>
            {flights.map(f => (
              <option key={f.flightID} value={f.flightID}>
                {f.flightNum} – {f.origin} → {f.destination} ({f.departureTime})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Employee</label>
          <select
            value={employeeID}
            onChange={e => setEmployeeID(e.target.value)}
            required
          >
            <option value="">Select an employee</option>
            {employees.map(emp => (
              <option key={emp.employeeID} value={emp.employeeID}>
                {emp.employeeID} – {emp.fullName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Create Assignee'}
        </button>
      </form>
    </div>
  );
}
