// File: app/lib/apiRestrictedItems.ts

import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import { RestrictedItem } from '../types/RestrictedItem';

const BASE_PATH = '/api/restricted-items';

/**
 * Fetch all restricted items.
 * GET /api/restricted-items
 */
export async function getAllRestrictedItems(): Promise<RestrictedItem[]> {
  return apiGet<RestrictedItem[]>(BASE_PATH);
}

/**
 * Fetch restricted item by ID.
 * GET /api/restricted-items/:id
 */
export async function getRestrictedItemById(id: string): Promise<RestrictedItem> {
  return apiGet<RestrictedItem>(`${BASE_PATH}/${id}`);
}

/**
 * Create a new restricted item.
 * POST /api/restricted-items
 *
 * itemID is excluded because backend usually auto-generates it.
 */
export async function createRestrictedItem(
  body: Omit<RestrictedItem, 'itemID'>
): Promise<RestrictedItem> {
  return apiPost<RestrictedItem>(BASE_PATH, body);
}

/**
 * Update restricted item.
 * PUT /api/restricted-items/:id
 */
export async function updateRestrictedItem(
  id: string,
  body: Partial<RestrictedItem>
): Promise<RestrictedItem> {
  return apiPut<RestrictedItem>(`${BASE_PATH}/${id}`, body);
}

/**
 * Delete restricted item.
 * DELETE /api/restricted-items/:id
 */
export async function deleteRestrictedItem(id: string): Promise<void> {
  return apiDelete<void>(`${BASE_PATH}/${id}`);
}
