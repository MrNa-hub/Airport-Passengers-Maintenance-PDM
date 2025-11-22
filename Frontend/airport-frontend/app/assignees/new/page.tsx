'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'employeeID', label: 'EmployeeID', placeholder: 'E0001' },
  { name: 'flightID', label: 'FlightID', placeholder: 'F0001' },
];

export default function NewAssigneePage() {
  return (
    <EntityNewPage
      title="New Assignee"
      apiPath="/api/assignees"
      backHref="/assignees"
      fields={fields}
    />
  );
}
