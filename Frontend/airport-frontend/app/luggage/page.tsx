// list: app/luggage/page.tsx
'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'luggageID', label: 'LuggageID' },
  { key: 'status', label: 'Status' },
  { key: 'weight', label: 'Weight' },
  { key: 'ticketID', label: 'TicketID' },
];

export default function LuggagePage() {
  return (
    <EntityListPage
      title="Luggage"
      apiPath="/api/luggage"
      columns={columns}
      newHref="/luggage/new"
    />
  );
}
