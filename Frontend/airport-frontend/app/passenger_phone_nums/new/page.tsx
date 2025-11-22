'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'phoneNum', label: 'Phone Number', placeholder: '+84...' },
  { name: 'passengerID', label: 'PassengerID', placeholder: 'P0001' },
];

export default function NewPassengerPhoneNumPage() {
  return (
    <EntityNewPage
      title="New Passenger Phone Number"
      apiPath="/api/passenger-phone-nums"
      backHref="/passenger-phone-nums"
      fields={fields}
    />
  );
}