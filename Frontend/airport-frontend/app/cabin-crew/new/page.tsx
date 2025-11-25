'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'employeeID', label: 'EmployeeID', placeholder: 'EM00415' },
  {
    name: 'certificationArea',
    label: 'Certification Area',
    placeholder: 'International',
  },
  { name: 'crewRank', label: 'Crew Rank', placeholder: 'Flight Attendant' },
];

export default function NewCabinCrewPage() {
  return (
    <EntityNewPage
      title="New Cabin Crew"
      apiPath="/api/cabin-crew"
      backHref="/cabin-crew"
      fields={fields}
    />
  );
}
