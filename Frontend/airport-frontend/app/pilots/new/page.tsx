'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'employeeID', label: 'EmployeeID', placeholder: 'EM01015' },
  {
    name: 'pilotLicenseNo',
    label: 'Pilot License No',
    placeholder: 'VN-PL17195',
  },
  { name: 'flightHours', label: 'Flight Hours', placeholder: '7256' },
  { name: 'rank', label: 'Rank', placeholder: 'First Officer' },
];

export default function NewPilotPage() {
  return (
    <EntityNewPage
      title="New Pilot"
      apiPath="/api/pilots"
      backHref="/pilots"
      fields={fields}
    />
  );
}
