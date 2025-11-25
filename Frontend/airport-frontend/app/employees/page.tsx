'use client';
import EntityListPage from '@/app/_components/EntityListPage';
import { Luggage } from '@/app/types/Employee'; 

const columns = [
  { key: 'fullName', label: 'Full Name' },
  { key: 'employeeID', label: 'Employee ID' },
];

export default function LuggagesPage() {
  return (
    <EntityListPage<Luggage>
      title="Employee Records"
      apiPath="/api/employee"
      columns={columns}
      newHref="/employee/new"
    />
  );
}