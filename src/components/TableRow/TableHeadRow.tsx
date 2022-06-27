import type { FC } from 'react';

import type { TableHeadProps } from '../../libs/interface';

import { TableHeadCell } from '../TableCell/TableHeadCell';

import { tableHeadRowStyle } from '../../styles';

export const TableHeadRow: FC<TableHeadProps> = ({
  tableSchema,
  tableData,
  setDraftTableData,
  classes,
  styles,
  sortable
}) => {
  return (
    <div
      style={tableHeadRowStyle(styles?.tableHeadRow)}
      className={classes?.tableHeadRow}
    >
      {tableSchema.map((col, i) => (
        <TableHeadCell
          key={i}
          {...col}
          tableData={tableData}
          setDraftTableData={setDraftTableData}
          classes={classes}
          styles={styles}
          sortable={sortable}
        />
      ))}
    </div>
  );
};
