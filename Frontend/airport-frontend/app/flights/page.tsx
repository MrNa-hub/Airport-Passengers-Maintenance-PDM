'use client';

import EntityListPage from '@/app/_components/EntityListPage';
import { Flight } from '@/app/types/Flight';

const columns = [
  { key: 'flightID', label: 'Flight ID' },
  { key: 'flightNum', label: 'Flight Num' },
  { key: 'origin', label: 'Origin' },
  { key: 'destination', label: 'Destination' },
  { key: 'departureTime', label: 'Departure Time' },
  { key: 'arrivalTime', label: 'Arrival Time' },
  { key: 'status', label: 'Status' },
  { key: 'aircraftID', label: 'Aircraft ID' },
];

export default function FlightsPage() {
  return (
    <EntityListPage<Flight>
      title="Flights"
      apiPath="/api/flights"
      columns={columns}
      newHref="/flights/new"
    />
  );
}