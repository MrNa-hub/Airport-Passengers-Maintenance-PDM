'use client';

import EntityNewPage from '@/app/_components/EntityNewPage';

const fields = [
  {
    name: 'restrictedItemsFound',
    label: 'Restricted Items',
    placeholder: 'Knife, scissors...',
  },
  { name: 'securityLogID', label: 'SecurityLogID', placeholder: 'S0001' },
];

export default function NewRestrictedItemPage() {
  return (
    <EntityNewPage
      title="New Restricted Item Record"
      apiPath="/api/restricted-items"
      backHref="/restricted-items"
      fields={fields}
    />
  );
}
