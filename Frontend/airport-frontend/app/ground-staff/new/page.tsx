'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'employeeID', label: 'EmployeeID', placeholder: 'E0001' },
  { name: 'department', label: 'Department', placeholder: 'Check-in' },
  { name: 'position', label: 'Position', placeholder: 'Staff' },
];

export default function NewGroundStaffPage() {
  return (
    <EntityNewPage
      title="New Ground Staff"
      apiPath="/api/ground-staff"
      backHref="/ground-staff"
      fields={fields}
    />
  );
}
