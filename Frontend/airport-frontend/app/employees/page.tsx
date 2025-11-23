'use client';
import { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '@/api/employees';
import type { Employee } from '@/types/employee';
import Link from 'next/link';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const load = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this employee?')) return;
    await deleteEmployee(id);
    load();
  };

  return (
    <div>
      <h1>Employees</h1>
      <Link href="/employees/new">New Employee</Link>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Role</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.employeeID}>
              <td>{e.employeeID}</td>
              <td>{e.firstName} {e.middleName} {e.lastName}</td>
              <td>{e.role}</td>
              <td>{e.email}</td>
              <td>
                <button onClick={() => handleDelete(e.employeeID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
