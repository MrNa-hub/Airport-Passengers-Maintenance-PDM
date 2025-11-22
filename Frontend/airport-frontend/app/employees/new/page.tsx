'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'employeeID', label: 'EmployeeID', placeholder: 'E0001' },
  { name: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
];

export default function NewEmployeePage() {
  return (
    <EntityNewPage
      title="New Employee"
      apiPath="/api/employees"
      backHref="/employees"
      fields={fields}
    />
  );
}
