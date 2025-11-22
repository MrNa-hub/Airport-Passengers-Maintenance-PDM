'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ColumnConfig } from '@/app/_components/EntityListPage';
import { FieldConfig, FieldType } from '@/app/_components/EntityNewPage';
import { Luggage, LuggageStatus } from '@/app/types/Luggage';
import { Ticket } from '@/app/types/Ticket';
import { getLuggageByTicketId, createLuggage } from '@/app/lib/apiLuggage';
import { getTicketById } from '@/app/lib/apiTicket'; // New import
import { apiPost } from '@/app/lib/apiClient'; // Used for the inline form

// Cấu hình cột cho bảng Luggage
const luggageColumns: ColumnConfig<Luggage>[] = [
  { key: 'luggageID', label: 'Luggage ID' },
  { key: 'weight', label: 'Weight (kg)' },
  { key: 'status', label: 'Status' },
];

// Cấu hình fields cho form tạo Luggage mới (chỉ cần weight và status)
const newLuggageFields: FieldConfig[] = [
    { name: 'weight', label: 'Weight (kg)', required: true, type: 'number', placeholder: '23.0' },
    { name: 'status', label: 'Status', required: true, placeholder: 'Checked-In, Loaded, etc.' },
    // NOTE: ticketID được lấy tự động từ URL, không cần user nhập
];

export default function TicketLuggagePage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params.ticketId as string;

  // State cho Ticket Info
  const [ticket, setTicket] = useState<Ticket | null>(null);
  
  // State cho Luggage List
  const [luggageData, setLuggageData] = useState<Luggage[]>([]);
  
  // State chung
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State cho form tạo mới
  const [newForm, setNewForm] = useState<Record<string, any>>({ weight: '', status: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);


  const loadData = async () => {
    if (!ticketId) return;

    try {
      setLoading(true);
      setError(null);

      // 1. Fetch Ticket Info
      const ticketResult = await getTicketById(ticketId);
      setTicket(ticketResult);

      // 2. Fetch Luggage List
      const luggages = await getLuggageByTicketId(ticketId);
      setLuggageData(luggages);

    } catch (err: any) {
      // If one fetch fails, display error but allow inspection of what worked
      if (!ticket) setError('Failed to load ticket details.');
      if (luggageData.length === 0) setError(err.message ?? `Failed to load data for Ticket ${ticketId}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [ticketId]);


  // Handler cho Form tạo mới Luggage
  const handleChange = (name: string, value: string, type?: FieldType) => {
    let v: any = value;
    if (type === 'number' && value !== '') {
      v = Number(value);
    }
    setNewForm(prev => ({ ...prev, [name]: v }));
  };

  const submitNewLuggage = async () => {
    if (!ticketId) return;
    
    try {
      setSubmitting(true);
      setFormError(null);

      // Tạo payload: thêm ticketID cố định từ URL vào form data
      const payload = {
          ...newForm,
          weight: Number(newForm.weight), // Ensure weight is number for API
          ticketID: ticketId
      };
      
      // Sử dụng API POST (có thể dùng createLuggage nếu đã import)
      await createLuggage(payload);

      // Reset form và reload list
      setNewForm({ weight: '', status: '' });
      loadData(); 
      
    } catch (err: any) {
      const msg = err?.message || 'Unknown error';
      setFormError(`Creation Failed: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };


  // --- RENDERING ---
  if (loading && !ticket) return <main className="p-6">Loading Ticket details...</main>;
  if (!ticket && !loading) return <main className="p-6 text-red-600">Ticket ID {ticketId} not found.</main>;
  if (error && !ticket) return <main className="p-6 text-red-600">Error: {error}</main>;

  return (
    <main className="p-6 space-y-6 max-w-4xl mx-auto">
      
      {/* 1. HEADER & TICKET INFO */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-gray-800">Luggage Management</h1>
            <button
                type="button"
                onClick={() => router.push(`/tickets/${ticketId}`)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
            >
                ← Back to Ticket Detail
            </button>
        </div>
        
        <h2 className="text-xl font-semibold text-blue-700">Ticket: {ticket?.ticketID}</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-600">
          <p><strong>Passenger ID:</strong> {ticket?.passengerID}</p>
          <p><strong>Flight ID:</strong> {ticket?.flightID}</p>
          <p><strong>Seat/Class:</strong> {ticket?.seat} / {ticket?.classType}</p>
          <p><strong>Purchase Date:</strong> {ticket?.purchaseDate ? new Date(ticket.purchaseDate).toLocaleString() : 'N/A'}</p>
        </div>
      </div>
      
      {/* 2. LUGGAGE LIST */}
      <h2 className="text-2xl font-semibold pt-4 border-t">Attached Luggage ({luggageData.length})</h2>
      {loading && !luggageData.length ? (
        <p>Loading luggage list...</p>
      ) : (
        <table className="w-full border-collapse shadow-sm">
          <thead>
            <tr className="bg-gray-100">
              {luggageColumns.map(col => (
                <th key={String(col.key)} className="border px-4 py-2 text-left text-sm font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {luggageData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 border-b">
                {luggageColumns.map(col => (
                  <td key={String(col.key)} className="px-4 py-2 text-sm">
                    {String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
            {luggageData.length === 0 && (
              <tr>
                <td colSpan={luggageColumns.length} className="text-center py-4 text-gray-500">
                  No luggage records found for this ticket.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* 3. INLINE NEW LUGGAGE FORM */}
      <h2 className="text-2xl font-semibold pt-4 border-t">Add New Luggage</h2>
      {formError && <p className="text-red-600">Error: {formError}</p>}
      
      <div className="p-4 border rounded-lg bg-white shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newLuggageFields.map(f => (
            <div key={f.name} className="flex flex-col gap-1">
              <label className="font-medium text-sm">
                {f.label}
                {f.required && <span className="text-red-500"> *</span>}
              </label>
              <input
                type={f.type ?? 'text'}
                required={f.required}
                placeholder={f.placeholder ?? f.label}
                className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                value={newForm[f.name] ?? ''}
                onChange={e => handleChange(f.name, e.target.value, f.type)}
              />
            </div>
          ))}
          <div className="flex flex-col gap-1 justify-end pt-5 md:pt-0">
            <button
              type="button"
              onClick={submitNewLuggage}
              disabled={submitting || !newForm.weight || !newForm.status}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
            >
              {submitting ? 'Adding...' : 'Add Luggage'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}