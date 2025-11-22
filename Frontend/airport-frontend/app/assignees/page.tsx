'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'employeeID', label: 'EmployeeID' },
  { key: 'flightID', label: 'FlightID' },
];

export default function AssigneesPage() {
  return (
    <EntityListPage
      title="Assignees"
      apiPath="/api/assignees"
      columns={columns}
      newHref="/assignees/new"
    />
  );
}
