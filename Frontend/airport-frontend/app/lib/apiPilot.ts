import type { Pilot } from '../types/Pilot';
import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
const BASE_PATH = '/api/pilot';

export async function getAllPilot(): Promise<Pilot[]> {
  return apiGet<Pilot[]>(BASE_PATH);
}

export async function getPilotById(id: string): Promise<Pilot> {
  return apiGet<Pilot>(`${BASE_PATH}/${id}`);
}

export async function createGroundStaff(pilot: Omit<Pilot, 'employeeID'>): Promise<Pilot> {
  return apiPost<Pilot>(BASE_PATH, pilot);
}

export async function updatePilot(id: string, pilot: Partial<Pilot>): Promise<Pilot> {
  return apiPut<Pilot>(`${BASE_PATH}/${id}`, pilot);
}

export async function deletePilot(id: string): Promise<void> {
  return apiDelete<void>(`${BASE_PATH}/${id}`);
}