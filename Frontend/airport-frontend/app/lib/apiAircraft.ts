// File: app/lib/apiAircraft.ts

import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import { Aircraft } from '../types/Aircraft';

const BASE_PATH = '/api/aircraft';

/**
 * Fetch all aircraft records.
 * GET /api/aircraft
 */
export async function getAllAircraft(): Promise<Aircraft[]> {
  return apiGet<Aircraft[]>(BASE_PATH);
}

/**
 * Fetch a single aircraft by ID.
 * GET /api/aircraft/:id
 */
export async function getAircraftById(id: string): Promise<Aircraft> {
  return apiGet<Aircraft>(`${BASE_PATH}/${id}`);
}

/**
 * Create a new aircraft record.
 * POST /api/aircraft
 *
 * Note:
 *   aircraftID is not included because it may be auto-generated
 *   or entered manually depending on your backend.
 */
export async function createAircraft(
  body: Omit<Aircraft, 'aircraftID'>
): Promise<Aircraft> {
  return apiPost<Aircraft>(BASE_PATH, body);
}

/**
 * Update an existing aircraft.
 * PUT /api/aircraft/:id
 */
export async function updateAircraft(
  id: string,
  body: Partial<Aircraft>
): Promise<Aircraft> {
  return apiPut<Aircraft>(`${BASE_PATH}/${id}`, body);
}

/**
 * Delete an aircraft.
 * DELETE /api/aircraft/:id
 */
export async function deleteAircraft(id: string): Promise<void> {
  return apiDelete<void>(`${BASE_PATH}/${id}`);
}
