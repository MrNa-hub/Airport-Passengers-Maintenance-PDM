import type { Employee } from '../types/Employee';
const BASE = 'http://localhost:7070/api';

export async function getEmployees(): Promise<Employee[]> {
  const res = await fetch(`${BASE}/employees`);
  if (!res.ok) throw new Error('Failed to load employees');
  return res.json();
}

export async function getEmployee(id: string): Promise<Employee> {
  const res = await fetch(`${BASE}/employees/${id}`);
  if (!res.ok) throw new Error('Failed to load employee');
  return res.json();
}

export async function createEmployee(data: Employee) {
  const res = await fetch(`${BASE}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create employee');
  return res.json();
}

export async function deleteEmployee(id: string) {
  const res = await fetch(`${BASE}/employees/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete employee');
}