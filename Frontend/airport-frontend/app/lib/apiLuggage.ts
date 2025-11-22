// File: app/lib/apiLuggage.ts

import { apiGet, apiPost } from './apiClient';
import { Luggage } from '../types/Luggage'; // Assuming path to types

const BASE_PATH = '/api/luggages';

/**
 * Fetches all luggage records.
 * @returns A promise that resolves to an array of Luggage objects.
 */
export async function getAllLuggages(): Promise<Luggage[]> {
  return apiGet<Luggage[]>(BASE_PATH);
}

/**
 * Fetches a single luggage record by its ID.
 * @param id The LuggageID.
 * @returns A promise that resolves to a Luggage object.
 */
export async function getLuggageById(id: string): Promise<Luggage> {
  return apiGet<Luggage>(`${BASE_PATH}/${id}`);
}

/**
 * Creates a new luggage record.
 * @param luggage The new luggage data.
 * @returns A promise that resolves to the newly created Luggage object.
 */
export async function createLuggage(luggage: Omit<Luggage, 'luggageID'>): Promise<Luggage> {
  // The backend generates luggageID, so we omit it here for insertion.
  return apiPost<Luggage>(BASE_PATH, luggage);
}