import type { CabinCrew } from '../types/CabinCrew';
import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';

const BASE_PATH = '/api/cabinCres';

export async function getCabinCrewByID(): Promise<CabinCrew[]> {
  return apiGet<CabinCrew[]>(BASE_PATH);
}

export async function createCabinCrew(cabinCrew: Omit<CabinCrew, 'passengerID'>): Promise<CabinCrew> {
  return apiPost<CabinCrew>(BASE_PATH, cabinCrew);
}

export async function deleteCabinCrew(employeeID: string): Promise<void> {
  return apiDelete<void>(`${BASE_PATH}/${employeeID}`);
}