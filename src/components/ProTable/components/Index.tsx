import type { ColumnDef } from '@tanstack/react-table';

const Index = <T extends object>(pageNumber: number, pageSize: number) => {
  const component: ColumnDef<T, any> = {
    id: 'index',
    size: 60,
    maxSize: 60,
    minSize: 60,
    enableSorting: false,
    header: () => 'STT',
    cell: ({ row }) => row.index + 1 + (pageNumber - 1) * pageSize,
    meta: {
      title: 'STT',
    },
  };

  return component;
};

export default Index;
