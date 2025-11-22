'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'ticketID', label: 'TicketID', placeholder: 'T0001' },
  { name: 'seat', label: 'Seat', placeholder: '12A' },
  { name: 'purchaseDate', label: 'Purchase Date', placeholder: '2025-11-21' },
  { name: 'ticketClass', label: 'Class', placeholder: 'Economy' },
  { name: 'passengerID', label: 'PassengerID', placeholder: 'P0001' },
  { name: 'flightID', label: 'FlightID', placeholder: 'F0001' },
];

export default function NewTicketPage() {
  return (
    <EntityNewPage
      title="New Ticket"
      apiPath="/api/tickets"
      backHref="/tickets"
      fields={fields}
    />
  );
}
