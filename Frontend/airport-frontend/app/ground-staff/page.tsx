'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'employeeID', label: 'EmployeeID' },
  { key: 'department', label: 'Department' },
  { key: 'position', label: 'Position' },
];

export default function GroundStaffPage() {
  return (
    <EntityListPage
      title="Ground Staff"
      apiPath="/api/ground-staff"
      columns={columns}
      newHref="/ground-staff/new"
    />
  );
}
