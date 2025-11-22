'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'aircraftID', label: 'AircraftID' },
  { key: 'registrationNum', label: 'RegistrationNum' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'model', label: 'Model' },
  { key: 'airline', label: 'Airline' },
];

export default function AircraftPage() {
  return (
    <EntityListPage
      title="Aircraft"
      apiPath="/api/aircraft"
      columns={columns}
      newHref="/aircraft/new"
    />
  );
}
