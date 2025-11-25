import type { GroundStaff } from '../types/GroundStaff';
import { apiGet, apiPost, apiDelete , apiPut} from './apiClient';

const BASE_PATH = '/api/groundStaff';

export async function getAllGroundStaff(): Promise<GroundStaff[]> {
  return apiGet<GroundStaff[]>(BASE_PATH);
}

export async function getGroundStaffById(id: string): Promise<GroundStaff> {
  return apiGet<GroundStaff>(`${BASE_PATH}/${id}`);
}

export async function createGroundStaff(groundstaff: Omit<GroundStaff, 'employeeID'>): Promise<GroundStaff> {
  return apiPost<GroundStaff>(BASE_PATH, groundstaff);
}

export async function updateGroundStaff(id: string, groundStaff: Partial<GroundStaff>): Promise<GroundStaff> {
  return apiPut<GroundStaff>(`${BASE_PATH}/${id}`, groundStaff);
}

export async function deleteGroundStaff(id: string): Promise<void> {
  return apiDelete<void>(`${BASE_PATH}/${id}`);
}