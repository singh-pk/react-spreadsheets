import type { FC } from 'react';

import type { TableBodyRowProps } from '../../libs/interface';
import type { KeyOfTableSchema } from '../../libs/types';

import { TableBodyCell } from '../TableCell/TableBodyCell';

import { tableBodyRowStyle } from '../../styles';

export const TableBodyRow: FC<TableBodyRowProps> = ({
  row,
  cursor,
  isSelected,
  updateTableData,
  updateCursor,
  tableSchema,
  classes,
  styles
}) => {
  return (
    <div
      style={tableBodyRowStyle(styles?.tableBodyRow)}
      className={classes?.tableBodyRow}
    >
      {tableSchema.map((col, i) => (
        <TableBodyCell
          key={col.id}
          data={row[col.id as KeyOfTableSchema] as number | string}
          isSelected={isSelected && cursor[1] === i}
          updateTableData={(value: string | number) =>
            updateTableData(col.id, value)
          }
          updateCursor={() => updateCursor(i)}
          {...col}
          classes={classes}
          styles={styles}
        />
      ))}
    </div>
  );
};
