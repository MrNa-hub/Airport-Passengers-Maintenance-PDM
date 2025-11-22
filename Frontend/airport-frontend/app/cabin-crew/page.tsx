'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'employeeID', label: 'EmployeeID' },
  { key: 'certificationArea', label: 'CertificationArea' },
  { key: 'crewRank', label: 'CrewRank' },
];

export default function CabinCrewPage() {
  return (
    <EntityListPage
      title="Cabin Crew"
      apiPath="/api/cabin-crew"
      columns={columns}
      newHref="/cabin-crew/new"
    />
  );
}
