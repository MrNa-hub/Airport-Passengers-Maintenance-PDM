'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'employeeID', label: 'EmployeeID', placeholder: 'E0002' },
  {
    name: 'pilotLicenseNo',
    label: 'Pilot License No',
    placeholder: 'LIC-12345',
  },
  { name: 'flightHours', label: 'Flight Hours', placeholder: '5000' },
  { name: 'rank', label: 'Rank', placeholder: 'Captain' },
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
