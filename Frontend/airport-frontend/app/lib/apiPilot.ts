import type { Pilot } from '../types/Pilot';
const BASE = 'http://localhost:7070/api';

export async function getPilot(): Promise<Pilot[]> {
  const res = await fetch(`${BASE}/pilot`);
  if (!res.ok) throw new Error('Failed to load pilot');
  return res.json();
}

export async function createPilot(data: Pilot) {
  const res = await fetch(`${BASE}/pilot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create pilot');
  return res.json();
}