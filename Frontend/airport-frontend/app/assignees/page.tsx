'use client';
import { useState, useEffect } from 'react';
import { getAssignees, deleteAssignee } from '../lib/apiAssignee';
import { getAllFlights } from '../lib/apiFlight';
import { getEmployees } from '../lib/apiEmployee';
import type { Assignee } from '../types/Assignee';
import type { Flight } from '../types/Flight';
import type { Employee } from '../types/Employee';
import Link from 'next/link';

export default function AssigneesPage() {
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [a, f, e] = await Promise.all([
        getAssignees(),
        getFlight(),
        getEmployees(),
      ]);
      setAssignees(a);
      setFlights(f);
      setEmployees(e);
    } catch (err) {
      setError('Failed to load assignees');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getFlight = (flightID: string) =>
    flights.find(f => f.flightID === flightID);

  const getEmployee = (employeeID: string) =>
    employees.find(emp => emp.employeeID === employeeID);

  const handleDelete = async (employeeID: string, flightID: string) => {
    if (!confirm('Delete this assignee?')) return;
    await deleteAssignee(employeeID, flightID);
    loadData();
  };

  return (
    <div>
      <h1>Assignees</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link href="/assignees/new">New Assignee</Link>

      <table>
        <thead>
          <tr>
            <th>Flight</th>
            <th>Route</th>
            <th>Employee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignees.map(a => {
            const f = getFlight(a.flightID);
            const emp = getEmployee(a.employeeID);
            return (
              <tr key={`${a.employeeID}-${a.flightID}`}>
                <td>{f ? f.flightNum : a.flightID}</td>
                <td>
                  {f ? `${f.origin} → ${f.destination}` : '-'}
                </td>
                <td>{emp ? emp.fullName : a.employeeID}</td>
                <td>
                  <button
                    onClick={() =>
                      handleDelete(a.employeeID, a.flightID)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          {assignees.length === 0 && (
            <tr>
              <td colSpan={4}>No assignees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}