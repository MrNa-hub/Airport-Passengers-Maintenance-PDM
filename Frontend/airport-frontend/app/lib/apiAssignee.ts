import type { Assignee } from '../types/Assignee';
import { apiGet, apiPost , apiDelete} from './apiClient';

const BASE_PATH = '/api/assignee';

export async function getAllAssignee(): Promise<Assignee[]> {
  return apiGet<Assignee[]>(BASE_PATH);
}

export async function getAssigneeById(id: string): Promise<Assignee> {
  return apiGet<Assignee>(`${BASE_PATH}/${id}`);
}

export async function createAssignee(assignee: Omit<Assignee, 'flightID'>): Promise<Assignee> {
  return apiPost<Assignee>(BASE_PATH, assignee);
}

export async function deleteAssignee(id: string): Promise<void> {
  return apiDelete<void>(`${BASE_PATH}/${id}`);
}
