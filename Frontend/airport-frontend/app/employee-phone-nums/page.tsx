'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'phoneNum', label: 'PhoneNum' },
  { key: 'employeeID', label: 'EmployeeID' },
];

export default function EmployeePhoneNumsPage() {
  return (
    <EntityListPage
      title="Employee Phone Numbers"
      apiPath="/api/employee-phone-nums"
      columns={columns}
      newHref="/employee-phone-nums/new"
    />
  );
}
