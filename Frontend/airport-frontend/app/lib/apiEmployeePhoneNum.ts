import type { EmployeePhoneNum } from '../types/EmployeePhoneNum';
const BASE = 'http://localhost:7070/api';

export async function getEmployeePhoneNums(): Promise<EmployeePhoneNum[]> {
  const res = await fetch(`${BASE}/employee-phone-nums`);
  if (!res.ok) throw new Error('Failed to load phone numbers');
  return res.json();
}

export async function createEmployeePhoneNum(data: EmployeePhoneNum) {
  const res = await fetch(`${BASE}/employee-phone-nums`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create phone number');
  return res.json();
}

export async function deleteEmployeePhoneNum(employeeID: string) {
  const res = await fetch(`${BASE}/employee-phone-nums/${employeeID}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete phone number');
}