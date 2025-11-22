'use client';

import EntityListPage from '@/app/_components/EntityListPage';
import { Luggage } from '@/app/types/Luggage'; // Assuming types are in app/types

const columns = [
  { key: 'luggageID', label: 'Luggage ID' },
  { key: 'ticketID', label: 'Ticket ID' },
  { key: 'weight', label: 'Weight (kg)' },
  { key: 'status', label: 'Status' },
];

export default function LuggagesPage() {
  return (
    <EntityListPage<Luggage>
      title="Luggage Records"
      apiPath="/api/luggages"
      columns={columns}
      newHref="/luggage/new"
    />
  );
}