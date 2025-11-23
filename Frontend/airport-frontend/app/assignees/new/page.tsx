'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFlights } from '@/api/flights';
import { getEmployees } from '@/api/employees';
import { createAssignee } from '@/api/assignees';
import type { Flight } from '@/types/flight';
import type { Employee } from '@/types/employee';

export default function NewAssigneePage() {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [flightID, setFlightID] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [duty, setDuty] = useState('');

  useEffect(() => {
    const load = async () => {
      const [f, e] = await Promise.all([getFlights(), getEmployees()]);
      setFlights(f);
      setEmployees(e);
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAssignee({ flightID, employeeID, duty });
    router.push('/assignees');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={flightID} onChange={e => setFlightID(e.target.value)} required>
        <option value="">Select Flight</option>
        {flights.map(f => (
          <option key={f.flightID} value={f.flightID}>
            {f.flightNum} – {f.departureAirportID} → {f.arrivalAirportID} ({f.departureTime})
          </option>
        ))}
      </select>

      <select value={employeeID} onChange={e => setEmployeeID(e.target.value)} required>
        <option value="">Select Employee</option>
        {employees.map(emp => (
          <option key={emp.employeeID} value={emp.employeeID}>
            {emp.employeeID} – {emp.firstName} {emp.middleName} {emp.lastName} ({emp.role})
          </option>
        ))}
      </select>

      <input type="text" placeholder="Duty" value={duty} onChange={e => setDuty(e.target.value)} required />
      <button type="submit">Assign</button>
    </form>
  );
}
