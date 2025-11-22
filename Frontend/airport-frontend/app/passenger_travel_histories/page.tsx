'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'travelHistory', label: 'TravelHistory' },
  { key: 'passengerID', label: 'PassengerID' },
];

export default function PassengerTravelHistoriesPage() {
  return (
    <EntityListPage
      title="Passenger Travel Histories"
      apiPath="/api/passenger-travel-histories"
      columns={columns}
      newHref="/passenger-travel-histories/new"
    />
  );
}
