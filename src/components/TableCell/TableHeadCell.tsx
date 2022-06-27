import { useState, createElement } from 'react';
import type { FC } from 'react';

import type { KeyOfTableSchema, TableHeadCellProps } from '../../libs/types';

import { tableHeadCellStyle } from '../../styles';

export const TableHeadCell: FC<TableHeadCellProps> = ({
  setDraftTableData,
  tableData,
  name,
  type,
  id,
  classes,
  styles,
  sortable
}) => {
  const [ascending, setAscending] = useState(false);

  const onMouseUp = () => {
    if (sortable) {
      if (window.getSelection()?.focusNode) {
        window.getSelection()?.removeAllRanges();
      }

      if (ascending) {
        if (type === 'number') {
          setDraftTableData?.([
            ...tableData.sort((a: any, b: any) => a[id] - b[id])
          ]);
        } else {
          setDraftTableData?.([
            ...tableData.sort((a, b) => {
              const nameA = a[id as KeyOfTableSchema] ?? '';
              const nameB = b[id as KeyOfTableSchema] ?? '';

              if (nameA > nameB) {
                return -1;
              }

              if (nameA < nameB) {
                return 1;
              }

              return 0;
            })
          ]);
        }

        setAscending(false);
      } else {
        if (type === 'number') {
          setDraftTableData?.([
            ...tableData.sort((a: any, b: any) => b[id] - a[id])
          ]);
        } else {
          setDraftTableData?.([
            ...tableData.sort((a, b) => {
              const nameA = a[id as KeyOfTableSchema] ?? '';
              const nameB = b[id as KeyOfTableSchema] ?? '';

              if (nameA < nameB) {
                return -1;
              }

              if (nameA > nameB) {
                return 1;
              }

              return 0;
            })
          ]);
        }

        setAscending(true);
      }
    }
  };

  const props = {
    onMouseUp: onMouseUp,
    style: tableHeadCellStyle(styles?.tableHeadCell),
    className: classes?.tableHeadCell
  };

  const element = createElement('div', props, name);

  return element;
};
