// File: app/lib/apiBoarding.ts

import { apiGet, apiPost } from './apiClient';
import { Boarding } from '../types/Boarding'; // Assuming path to types

const BASE_PATH = '/api/boardings';

/**
 * Fetches all boarding records.
 * @returns A promise that resolves to an array of Boarding objects.
 */
export async function getAllBoardings(): Promise<Boarding[]> {
  return apiGet<Boarding[]>(BASE_PATH);
}

/**
 * Fetches a single boarding record by its PassID.
 * @param id The PassID (UUID).
 * @returns A promise that resolves to a Boarding object.
 */
export async function getBoardingById(id: string): Promise<Boarding> {
  return apiGet<Boarding>(`${BASE_PATH}/${id}`);
}

/**
 * Creates a new boarding record.
 * @param boarding The new boarding data.
 * @returns A promise that resolves to the newly created Boarding object.
 */
export async function createBoarding(boarding: Partial<Omit<Boarding, 'passID'>> & { ticketID: string; flightID: string }): Promise<Boarding> {
  // The backend generates PassID if not provided, and requires ticketID and flightID.
  return apiPost<Boarding>(BASE_PATH, boarding);
}