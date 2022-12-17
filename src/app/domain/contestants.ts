import { TableHeader } from '../shared/table/table.component';

export const contestantsHeaders: TableHeader[] = [
  { label: 'Name', accessor: 'name' },
  {
    label: 'Age',
    accessor: 'birthDate',
    processFn: (value: string) =>
      (new Date().getFullYear() - new Date(value).getFullYear()).toString(),
  },
  { label: 'Gender', accessor: 'gender' },
  { label: 'Ski Length', accessor: 'skiLength' },
];
