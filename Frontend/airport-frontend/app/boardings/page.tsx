'use client';

import EntityListPage from '@/app/_components/EntityListPage';
import { Boarding } from '@/app/types/Boarding'; // Assuming types are in app/types

const columns = [
  { key: 'passID', label: 'Pass ID' },
  { key: 'ticketID', label: 'Ticket ID' },
  { key: 'flightID', label: 'Flight ID' },
  { key: 'gateNum', label: 'Gate' },
  { key: 'seat', label: 'Seat' },
  { key: 'boardingTime', label: 'Boarding Time' },
  { key: 'status', label: 'Status' },
];

export default function BoardingsPage() {
  return (
    <EntityListPage<Boarding>
      title="Boarding Records"
      apiPath="/api/boardings"
      columns={columns}
      newHref="/boardings/new"
    />
  );
}