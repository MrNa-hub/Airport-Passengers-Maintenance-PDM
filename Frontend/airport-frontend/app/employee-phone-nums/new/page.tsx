'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  { name: 'phoneNum', label: 'Phone Number', placeholder: '+84...' },
  { name: 'employeeID', label: 'EmployeeID', placeholder: 'E0001' },
];

export default function NewEmployeePhoneNumPage() {
  return (
    <EntityNewPage
      title="New Employee Phone Number"
      apiPath="/api/employee-phone-nums"
      backHref="/employee-phone-nums"
      fields={fields}
    />
  );
}
