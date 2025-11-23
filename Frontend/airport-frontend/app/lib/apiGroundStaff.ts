import type { GroundStaff } from '../types/GroundStaff';
const BASE = 'http://localhost:7070/api';

export async function getPilot(): Promise<GroundStaff[]> {
  const res = await fetch(`${BASE}/groundStaff`);
  if (!res.ok) throw new Error('Failed to load groundStaff');
  return res.json();
}

export async function createPilot(data: GroundStaff) {
  const res = await fetch(`${BASE}/groundStaff`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create groundStaff');
  return res.json();
}