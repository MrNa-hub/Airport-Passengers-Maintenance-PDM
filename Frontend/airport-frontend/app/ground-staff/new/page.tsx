'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'employeeID', label: 'Employee ID', placeholder: 'EM01679' },
  { name: 'department', label: 'Department', placeholder: 'Gate Operations' },
  { name: 'position', label: 'Position', placeholder: 'Manager' },
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
