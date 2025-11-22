'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'securityLogID', label: 'SecurityLogID', placeholder: 'S0001' },
  { name: 'timestamp', label: 'Timestamp', placeholder: '2025-11-21T10:00' },
  { name: 'screeningResult', label: 'Screening Result', placeholder: 'Clear' },
  { name: 'ticketID', label: 'TicketID', placeholder: 'T0001' },
];

export default function NewSecurityLogPage() {
  return (
    <EntityNewPage
      title="New Security Log"
      apiPath="/api/security-logs"
      backHref="/security-logs"
      fields={fields}
    />
  );
}
