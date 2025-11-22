'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'flightID', label: 'FlightID', placeholder: 'F0001' },
  { name: 'flightNum', label: 'Flight Number', placeholder: 'VN123' },
  {
    name: 'departureTime',
    label: 'Departure Time',
    placeholder: '2025-11-21T13:00',
  },
  {
    name: 'arrivalTime',
    label: 'Arrival Time',
    placeholder: '2025-11-21T16:30',
  },
  { name: 'destination', label: 'Destination', placeholder: 'LAX' },
  { name: 'status', label: 'Status', placeholder: 'On Time' },
    { name: 'aircraftID', label: 'AircraftID', placeholder: 'A0001' },
];

export default function NewFlightPage() {
  return (
    <EntityNewPage
      title="New Flight"
      apiPath="/api/flights"
      backHref="/flights"
      fields={fields}
    />
  );
}
