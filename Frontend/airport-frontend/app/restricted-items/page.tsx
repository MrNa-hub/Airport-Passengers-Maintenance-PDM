'use client';

import EntityListPage from '@/app/_components/EntityListPage';

const columns = [
  { key: 'restrictedItemsFound', label: 'RestrictedItemsFound' },
  { key: 'securityLogID', label: 'SecurityLogID' },
];

export default function RestrictedItemsPage() {
  return (
    <EntityListPage
      title="Restricted Items Found"
      apiPath="/api/restricted-items"
      columns={columns}
      newHref="/restricted-items/new"
    />
  );
}
