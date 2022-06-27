import { useState, useEffect, useRef } from 'react';
import type { FC, RefObject } from 'react';

import type { KeyOfTableSchema, TableSchema } from '../../libs/types';
import type { TableProps } from '../../libs/interface';

import { TableHead } from '../TableHead';
import { TableBody } from '../TableBody';

import { tableStyle } from '../../styles';

export const Table: FC<TableProps> = ({
  tableSchema,
  initialTableData,
  searchableValue,
  autoGrow = true,
  classes,
  styles,
  sortable = false,
  ...props
}) => {
  const [rowNums, setRowNums] = useState<number>(1);

  const [tableData, setTableData] = useState<TableSchema[]>(
    Array.isArray(initialTableData) ? initialTableData : []
  );

  const [draftTableData, setDraftTableData] = useState<TableSchema[]>([]);

  const tableRef = useRef() as RefObject<HTMLDivElement>;

  useEffect(() => {
    if (rowNums > tableData.length) {
      const newRows = new Array(rowNums - tableData.length).fill({});
      setTableData((d: TableSchema[]) => [...d, ...newRows]);
    }

    // eslint-disable-next-line
  }, [rowNums]);

  useEffect(() => {
    if (props.rowNum) setRowNums(d => d + Number(props.rowNum));
  }, [props.rowNum]);

  const updateTableData = (rowId: number, colId: string, value: any) =>
    setTableData(tableData => {
      let rowData = { ...tableData[rowId], [colId]: value };

      for (let i = 0; i < tableSchema.length; i++) {
        const cell = tableSchema[i];

        if (cell?.getRow) {
          rowData = { ...rowData, [cell.id]: cell.getRow(rowData) };
        }
      }

      tableData[rowId] = rowData as TableSchema;

      return [...tableData];
    });

  useEffect(() => {
    props.getTableData?.(tableData);

    // eslint-disable-next-line
  }, [tableData]);

  useEffect(() => {
    props.getDraftTableData?.(draftTableData);

    // eslint-disable-next-line
  }, [draftTableData]);

  useEffect(() => {
    if (props.onFilter) setDraftTableData(props.onFilter(tableData));

    // eslint-disable-next-line
  }, [props.onFilter, tableData]);

  useEffect(() => {
    const newArr: TableSchema[] = [];

    if (searchableValue) {
      for (const i of tableData) {
        for (const j of tableSchema) {
          if (
            (!j.type || j.type === 'text' || j.type === 'number') &&
            j.searchable
          ) {
            if (
              i[j.id as KeyOfTableSchema]?.toString().includes(searchableValue)
            ) {
              newArr.push(i);
            }
          }
        }
      }
    }

    setDraftTableData(newArr);

    // eslint-disable-next-line
  }, [searchableValue]);

  return (
    <div
      className={classes?.table}
      style={tableStyle(styles?.table)}
      ref={tableRef}
    >
      <TableHead
        tableSchema={tableSchema}
        tableData={tableData}
        setDraftTableData={setDraftTableData}
        classes={classes}
        styles={styles}
        sortable={sortable}
      />

      <TableBody
        tableSchema={tableSchema}
        tableData={tableData}
        draftTableData={draftTableData}
        rowNums={rowNums}
        setRowNums={setRowNums}
        updateTableData={updateTableData}
        autoGrow={autoGrow}
        classes={classes}
        styles={styles}
      />
    </div>
  );
};
