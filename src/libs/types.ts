import type { OptionHTMLAttributes, CSSProperties } from 'react';
import type { ClassNames } from './interface';

type ModifyProp<T, M> = {
  [K in keyof T]: M;
};

type InlineStyles = ModifyProp<ClassNames, CSSProperties>;

type Options = OptionHTMLAttributes<any>[];

type Dispatcher<T> = React.Dispatch<React.SetStateAction<T>>;

type TableSchema = {
  id: string;
  name: string;
  readOnly?: boolean;
  getRow?: (row: { [key: string]: any }) => any;
} & (
  | {
      type?: 'text';
      dataFormator?: (data: string) => string;
      searchable?: boolean;
    }
  | {
      type: 'number';
      dataFormator?: (data: number) => number;
      searchable?: boolean;
    }
  | { type: 'select'; options: Options }
);

type KeyOfTableSchema = keyof TableSchema;

type TableHeadCellProps<T = TableSchema> = T & {
  tableData: T[];
  setDraftTableData: Dispatcher<T[]>;
  classes?: ClassNames;
  styles?: InlineStyles;
  sortable?: boolean;
};

type TableBodyCellProps = TableSchema & {
  updateTableData: (value: number | string) => void;
  updateCursor: () => void;
  isSelected: boolean;
  data: number | string;
  dataFormator?: (data: any) => any;
  options?: Options;
  classes?: ClassNames;
  styles?: InlineStyles;
};

export type {
  Options,
  TableSchema,
  KeyOfTableSchema,
  Dispatcher,
  TableHeadCellProps,
  TableBodyCellProps,
  InlineStyles
};
