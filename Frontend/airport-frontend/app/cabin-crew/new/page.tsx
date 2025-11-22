'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'employeeID', label: 'EmployeeID', placeholder: 'E0003' },
  {
    name: 'certificationArea',
    label: 'Certification Area',
    placeholder: 'Safety',
  },
  { name: 'crewRank', label: 'Crew Rank', placeholder: 'Senior' },
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
