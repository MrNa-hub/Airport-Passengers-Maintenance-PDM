// File: app/lib/apiFlight.ts

import { apiGet, apiPost } from './apiClient';
import { Flight } from '../types/Flight'; // Assuming path to types

const BASE_PATH = '/api/flights';

/**
 * Fetches all flight records.
 * @returns A promise that resolves to an array of Flight objects.
 */
export async function getAllFlights(): Promise<Flight[]> {
  return apiGet<Flight[]>(BASE_PATH);
}

/**
 * Fetches a single flight record by its ID.
 * @param id The FlightID.
 * @returns A promise that resolves to a Flight object.
 */
export async function getFlightById(id: string): Promise<Flight> {
  return apiGet<Flight>(`${BASE_PATH}/${id}`);
}

/**
 * Creates a new flight record.
 * @param flight The new flight data.
 * @returns A promise that resolves to the newly created Flight object.
 */
export async function createFlight(flight: Omit<Flight, 'flightID'>): Promise<Flight> {
  // The backend generates flightID, so we omit it here for insertion.
  return apiPost<Flight>(BASE_PATH, flight);
}

// Optional: You could add update (apiPut) and delete (apiDelete) functions here too.