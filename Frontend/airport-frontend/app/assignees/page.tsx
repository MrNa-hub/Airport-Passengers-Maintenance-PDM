'use client';
import { useState, useEffect } from 'react';
import { getAssignees, deleteAssignee } from '@/api/assignees';
import { getFlights } from '@/api/flights';
import { getEmployees } from '@/api/employees';
import type { Assignee } from '@/types/assignee';
import type { Flight } from '@/types/flight';
import type { Employee } from '@/types/employee';
import Link from 'next/link';

export default function AssigneesPage() {
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const loadData = async () => {
    const [a, f, e] = await Promise.all([getAssignees(), getFlights(), getEmployees()]);
    setAssignees(a);
    setFlights(f);
    setEmployees(e);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (flightID: string, employeeID: string) => {
    if (!confirm('Delete this assignee?')) return;
    await deleteAssignee(flightID, employeeID);
    loadData();
  };

  const getFlight = (flightID: string) => flights.find(f => f.flightID === flightID);
  const getEmployee = (employeeID: string) => employees.find(e => e.employeeID === employeeID);

  return (
    <div>
      <h1>Assignees</h1>
      <Link href="/assignees/new">New Assignee</Link>
      <table>
        <thead>
          <tr>
            <th>Flight</th>
            <th>Route</th>
            <th>Employee</th>
            <th>Role/Duty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignees.map(a => {
            const f = getFlight(a.flightID);
            const emp = getEmployee(a.employeeID);
            return (
              <tr key={`${a.flightID}-${a.employeeID}`}>
                <td>{f?.flightNum || a.flightID}</td>
                <td>{f ? `${f.departureAirportID} → ${f.arrivalAirportID}` : '-'}</td>
                <td>{emp ? `${emp.firstName} ${emp.middleName || ''} ${emp.lastName}` : a.employeeID}</td>
                <td>{a.duty}</td>
                <td>
                  <button onClick={() => handleDelete(a.flightID, a.employeeID)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
