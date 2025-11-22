'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'employeeID', label: 'EmployeeID' },
  { key: 'fullName', label: 'FullName' },
];

export default function EmployeesPage() {
  return (
    <EntityListPage
      title="Employees"
      apiPath="/api/employees"
      columns={columns}
      newHref="/employees/new"
    />
  );
}
