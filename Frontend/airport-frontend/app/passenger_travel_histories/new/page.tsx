'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'travelHistory', label: 'Travel History', placeholder: 'SGN-LAX-...' },
  { name: 'passengerID', label: 'PassengerID', placeholder: 'P0001' },
];

export default function NewPassengerTravelHistoryPage() {
  return (
    <EntityNewPage
      title="New Passenger Travel History"
      apiPath="/api/passenger-travel-histories"
      backHref="/passenger-travel-histories"
      fields={fields}
    />
  );
}
