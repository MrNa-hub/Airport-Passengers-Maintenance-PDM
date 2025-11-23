import type { Assignee } from '../types/Assignee';
const BASE = 'http://localhost:7070/api';

export async function getAssignees(): Promise<Assignee[]> {
  const res = await fetch(`${BASE}/assignees`);
  if (!res.ok) throw new Error('Failed to load assignees');
  return res.json();
}

export async function createAssignee(data: Assignee) {
  const res = await fetch(`${BASE}/assignees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create assignee');
  return res.json();
}

export async function deleteAssignee(flightID: string, employeeID: string) {
  const res = await fetch(`${BASE}/assignees/${flightID}/${employeeID}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete assignee');
}
