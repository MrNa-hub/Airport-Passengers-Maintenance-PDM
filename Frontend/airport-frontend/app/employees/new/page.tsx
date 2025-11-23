'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEmployee } from '@/api/employees';
import type { Employee } from '@/types/employee';

export default function NewEmployeePage() {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Employee>>({ firstName: '', lastName: '', role: 'PILOT' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEmployee(form as Employee);
    router.push('/employees');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
      <input name="middleName" placeholder="Middle Name" value={form.middleName || ''} onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="PILOT">Pilot</option>
        <option value="CABIN_CREW">Cabin Crew</option>
        <option value="GROUND_STAFF">Ground Staff</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
}
