// File: app/lib/apiTicket.ts

import { apiGet } from './apiClient';
import { Ticket } from '../types/Ticket';

const BASE_PATH = '/api/tickets';

/**
 * Fetches a single ticket record by its ID.
 * @param id The TicketID.
 * @returns A promise that resolves to a Ticket object.
 */
export async function getTicketById(id: string): Promise<Ticket> {
  return apiGet<Ticket>(`${BASE_PATH}/${id}`);
}