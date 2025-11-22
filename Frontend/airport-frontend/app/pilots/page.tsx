'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'employeeID', label: 'EmployeeID' },
  { key: 'pilotLicenseNo', label: 'PilotLicenseNo' },
  { key: 'flightHours', label: 'FlightHours' },
  { key: 'rank', label: 'Rank' },
];

export default function PilotsPage() {
  return (
    <EntityListPage
      title="Pilots"
      apiPath="/api/pilots"
      columns={columns}
      newHref="/pilots/new"
    />
  );
}
