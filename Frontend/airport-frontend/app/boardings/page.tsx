'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'passID', label: 'PassID' },
  { key: 'gateNum', label: 'GateNum' },
  { key: 'boardingTime', label: 'BoardingTime' },
  { key: 'status', label: 'Status' },
  { key: 'ticketID', label: 'TicketID' },
];

export default function BoardingsPage() {
  return (
    <EntityListPage
      title="Boarding Passes"
      apiPath="/api/boardings"
      columns={columns}
      newHref="/boardings/new"
    />
  );
}
