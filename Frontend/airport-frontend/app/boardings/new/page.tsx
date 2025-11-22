'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'passID', label: 'PassID', placeholder: 'BP0001' },
  { name: 'gateNum', label: 'Gate Number', placeholder: 'A1' },
  {
    name: 'boardingTime',
    label: 'Boarding Time',
    placeholder: '2025-11-21T11:30',
  },
  { name: 'status', label: 'Status', placeholder: 'Boarded' },
  { name: 'ticketID', label: 'TicketID', placeholder: 'T0001' },
];

export default function NewBoardingPage() {
  return (
    <EntityNewPage
      title="New Boarding Pass"
      apiPath="/api/boardings"
      backHref="/boardings"
      fields={fields}
    />
  );
}
