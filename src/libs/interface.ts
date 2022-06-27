import type { TableSchema, Dispatcher, InlineStyles } from './types';

interface ClassNames {
  table?: string;
  tableHead?: string;
  tableHeadRow?: string;
  tableHeadCell?: string;
  tableBody?: string;
  tableBodyRow?: string;
  tableBodyCell?: string;
  tableBodyCellSelect?: string;
  tableBodyCellSelected?: string;
}

interface TableProps {
  tableSchema: TableSchema[];
  initialTableData?: TableSchema[];
  getTableData?: (data: TableSchema[]) => any;
  getDraftTableData?: (data: TableSchema[]) => any;
  onFilter?: (data: TableSchema[]) => TableSchema[];
  searchableValue?: string;
  autoGrow?: boolean;
  sortable?: boolean;
  rowNum?: number;
  classes?: ClassNames;
  styles?: InlineStyles;
}

interface TableHeadProps {
  tableSchema: TableSchema[];
  tableData: TableSchema[];
  setDraftTableData: Dispatcher<TableSchema[]>;
  classes?: ClassNames;
  styles?: InlineStyles;
  sortable?: boolean;
}

interface TableBodyProps {
  tableSchema: TableSchema[];
  tableData: TableSchema[];
  draftTableData: TableSchema[];
  rowNums: number;
  setRowNums: Dispatcher<number>;
  autoGrow: boolean;
  updateTableData: (
    rowId: number,
    colId: TableSchema['id'],
    value: number | string
  ) => void;
  classes?: ClassNames;
  styles?: InlineStyles;
}

interface TableBodyRowProps {
  tableSchema: TableSchema[];
  row: TableSchema;
  rowNum: number;
  cursor: readonly [number, number];
  isSelected: boolean;
  updateTableData: (colId: TableSchema['id'], value: number | string) => void;
  updateCursor: (delY: number) => void;
  classes?: ClassNames;
  styles?: InlineStyles;
}

export type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableBodyRowProps,
  ClassNames
};
