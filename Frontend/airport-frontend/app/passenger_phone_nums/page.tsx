'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'phoneNum', label: 'PhoneNum' },
  { key: 'passengerID', label: 'PassengerID' },
];

export default function PassengerPhoneNumsPage() {
  return (
    <EntityListPage
      title="Passenger Phone Numbers"
      apiPath="/api/passenger-phone-nums"
      columns={columns}
      newHref="/passenger-phone-nums/new"
    />
  );
}
