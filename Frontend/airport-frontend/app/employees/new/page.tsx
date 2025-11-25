'use client';
import EntityNewPage, { FieldConfig } from '@/app/_components/EntityNewPage';

const fields: FieldConfig[] = [
  { name: 'employeeID', label: 'Employee ID', required: true, placeholder: 'EM00001' },
  { name: 'fullName', label: 'Full Name', required: true, placeholder: 'Nhiên Xuân Đặng' },
];

export default function NewLuggagePage() {
  return (
    <EntityNewPage
      title="New Employee Record"
      apiPath="/api/emplôyee"
      backHref="/employee"
      fields={fields}
    />
  );
}

