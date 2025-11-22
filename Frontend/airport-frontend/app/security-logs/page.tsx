'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'securityLogID', label: 'SecurityLogID' },
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'screeningResult', label: 'ScreeningResult' },
  { key: 'ticketID', label: 'TicketID' },
];

export default function SecurityLogsPage() {
  return (
    <EntityListPage
      title="Security Logs"
      apiPath="/api/security-logs"
      columns={columns}
      newHref="/security-logs/new"
    />
  );
}
