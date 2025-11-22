// File: app/lib/apiPassengerTravelHistory.ts

import { apiGet, apiPost, apiDelete } from './apiClient';
import { PassengerTravelHistory } from '../types/PassengerTravelHistory';

const BASE_PATH = '/api/passenger-travel-histories';

/**
 * Fetches all passenger travel history records.
 * @returns A promise that resolves to an array of PassengerTravelHistory objects.
 */
export async function getAllPassengerTravelHistories(): Promise<PassengerTravelHistory[]> {
  return apiGet<PassengerTravelHistory[]>(BASE_PATH);
}

/**
 * Fetches all travel histories for a specific passenger.
 * @param passengerId The PassengerID.
 * @returns A promise that resolves to an array of PassengerTravelHistory objects.
 */
export async function getPassengerTravelHistoriesByPassengerId(passengerId: string): Promise<PassengerTravelHistory[]> {
  return apiGet<PassengerTravelHistory[]>(`${BASE_PATH}?passengerId=${passengerId}`);
}

/**
 * Creates a new passenger travel history record.
 * @param travelHistory The travel history data to create.
 * @returns A promise that resolves to the created PassengerTravelHistory object.
 */
export async function createPassengerTravelHistory(travelHistory: PassengerTravelHistory): Promise<PassengerTravelHistory> {
  return apiPost<PassengerTravelHistory>(BASE_PATH, travelHistory);
}

/**
 * Deletes a passenger travel history record.
 * @param passengerId The PassengerID.
 * @param travelHistory The travel history string to delete.
 */
export async function deletePassengerTravelHistory(passengerId: string, travelHistory: string): Promise<void> {
  return apiDelete<void>(`${BASE_PATH}/${passengerId}/${encodeURIComponent(travelHistory)}`);
}

