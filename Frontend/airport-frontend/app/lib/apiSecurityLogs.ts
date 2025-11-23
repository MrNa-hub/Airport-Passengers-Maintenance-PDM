// File: app/lib/apiSecurityLogs.ts

import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import { SecurityLog } from '../types/SecurityLog';

const BASE_PATH = '/api/security-logs';

/**
 * Fetch all security logs.
 * GET /api/security-logs
 */
export async function getAllSecurityLogs(): Promise<SecurityLog[]> {
  return apiGet<SecurityLog[]>(BASE_PATH);
}

/**
 * Fetch a single security log by ID.
 * GET /api/security-logs/:id
 */
export async function getSecurityLogById(id: string): Promise<SecurityLog> {
  return apiGet<SecurityLog>(`${BASE_PATH}/${id}`);
}

/**
 * Create a new security log.
 * POST /api/security-logs
 *
 * Body fields:
 *   - flightID
 *   - employeeID
 *   - logTime
 *   - gate?
 *   - note?
 *   - restrictedItemIDs[] (optional)
 *
 * securityLogID should NOT be included.
 */
export async function createSecurityLog(
  body: Omit<SecurityLog, 'securityLogID'>
): Promise<SecurityLog> {
  return apiPost<SecurityLog>(BASE_PATH, body);
}

/**
 * Update an existing security log.
 * PUT /api/security-logs/:id
 */
export async function updateSecurityLog(
  id: string,
  body: Partial<SecurityLog>
): Promise<SecurityLog> {
  return apiPut<SecurityLog>(`${BASE_PATH}/${id}`, body);
}

/**
 * Delete security log.
 * DELETE /api/security-logs/:id
 */
export async function deleteSecurityLog(id: string): Promise<void> {
  return apiDelete<void>(`${BASE_PATH}/${id}`);
}
