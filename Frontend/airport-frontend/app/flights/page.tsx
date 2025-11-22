'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'flightID', label: 'FlightID' },
  { key: 'flightNum', label: 'FlightNum' },
  { key: 'departureTime', label: 'DepartureTime' },
  { key: 'arrivalTime', label: 'ArrivalTime' },
  { key: 'destination', label: 'Destination' },
  { key: 'status', label: 'Status' },
  { key: 'aircraftID', label: 'AircraftID' },
];

export default function FlightsPage() {
  return (
    <EntityListPage
      title="Flights"
      apiPath="/api/flights"
      columns={columns}
      newHref="/flights/new"
    />
  );
}
