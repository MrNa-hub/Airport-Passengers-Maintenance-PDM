'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'aircraftID', label: 'AircraftID', placeholder: 'A0001' },
  {
    name: 'registrationNum',
    label: 'Registration Number',
    placeholder: 'VN-A123',
  },
  { name: 'capacity', label: 'Capacity', placeholder: '180' },
  { name: 'model', label: 'Model', placeholder: 'A321' },
  { name: 'airline', label: 'Airline', placeholder: 'Vietnam Airlines' },
];

export default function NewAircraftPage() {
  return (
    <EntityNewPage
      title="New Aircraft"
      apiPath="/api/aircraft"
      backHref="/aircraft"
      fields={fields}
    />
  );
}
