// File: app/lib/apiPassengerPhoneNum.ts

import { apiGet, apiPost, apiDelete } from './apiClient';
import { PassengerPhoneNum } from '../types/PassengerPhoneNum';

const BASE_PATH = '/api/passenger-phone-nums';

/**
 * Fetches all passenger phone number records.
 * @returns A promise that resolves to an array of PassengerPhoneNum objects.
 */
export async function getAllPassengerPhoneNums(): Promise<PassengerPhoneNum[]> {
  return apiGet<PassengerPhoneNum[]>(BASE_PATH);
}

/**
 * Fetches all phone numbers for a specific passenger.
 * @param passengerId The PassengerID.
 * @returns A promise that resolves to an array of PassengerPhoneNum objects.
 */
export async function getPassengerPhoneNumsByPassengerId(passengerId: string): Promise<PassengerPhoneNum[]> {
  return apiGet<PassengerPhoneNum[]>(`${BASE_PATH}?passengerId=${passengerId}`);
}

/**
 * Creates a new passenger phone number record.
 * @param phoneNum The phone number data to create.
 * @returns A promise that resolves to the created PassengerPhoneNum object.
 */
export async function createPassengerPhoneNum(phoneNum: PassengerPhoneNum): Promise<PassengerPhoneNum> {
  return apiPost<PassengerPhoneNum>(BASE_PATH, phoneNum);
}

/**
 * Deletes a passenger phone number record.
 * @param passengerId The PassengerID.
 * @param phoneNum The phone number to delete.
 */
export async function deletePassengerPhoneNum(passengerId: string, phoneNum: string): Promise<void> {
  return apiDelete<void>(`${BASE_PATH}/${passengerId}/${encodeURIComponent(phoneNum)}`);
}

