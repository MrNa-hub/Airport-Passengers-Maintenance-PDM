'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'luggageID', label: 'LuggageID', placeholder: 'L0001' },
  { name: 'status', label: 'Status', placeholder: 'Loaded' },
  { name: 'weight', label: 'Weight', placeholder: '23.5' },
  { name: 'ticketID', label: 'TicketID', placeholder: 'T0001' },
];

export default function NewLuggagePage() {
  return (
    <EntityNewPage
      title="New Luggage"
      apiPath="/api/luggage"
      backHref="/luggage"
      fields={fields}
    />
  );
}
