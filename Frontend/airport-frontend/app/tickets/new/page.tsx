'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'ticketID', label: 'TicketID' },
  { key: 'seat', label: 'Seat' },
  { key: 'purchaseDate', label: 'PurchaseDate' },
  { key: 'ticketClass', label: 'Class' },
  { key: 'passengerID', label: 'PassengerID' },
  { key: 'flightID', label: 'FlightID' },
];

export default function TicketsPage() {
  return (
    <EntityListPage
      title="Tickets"
      apiPath="/api/tickets"
      columns={columns}
      newHref="/tickets/new"
    />
  );
}
