import { useEffect, useState, useRef } from 'react';
import type { FC, RefObject } from 'react';

import type { TableBodyProps } from '../../libs/interface';

import { TableBodyRow } from '../TableRow/TableBodyRow';

import { tableBodyStyle } from '../../styles';

export const TableBody: FC<TableBodyProps> = ({
  tableSchema,
  rowNums,
  setRowNums,
  updateTableData,
  tableData,
  draftTableData,
  autoGrow,
  classes,
  styles
}) => {
  const [cursor, setCursor] = useState<[number, number]>([-1, -1]);
  let tableBodyRef = useRef(null) as RefObject<HTMLDivElement>;

  const table = draftTableData.length > 0 ? draftTableData : tableData;

  function checkOutsideClick(this: Document, event: MouseEvent) {
    if (!tableBodyRef.current?.contains(event.target as Node | null)) {
      setCursor([-1, -1]);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', checkOutsideClick);

    return () => document.removeEventListener('mousedown', checkOutsideClick);
  }, []);

  useEffect(() => {
    if (autoGrow && cursor[0] > rowNums - 1) {
      setRowNums((d: number) => d + 1);
    }

    // eslint-disable-next-line
  }, [cursor]);

  useEffect(() => {
    let focusNode = tableBodyRef?.current?.childNodes?.[cursor[0]]
      ?.childNodes?.[cursor[1]] as HTMLElement;

    if (
      focusNode?.childNodes &&
      focusNode.childNodes[0]?.nodeName === 'SELECT'
    ) {
      focusNode = focusNode.childNodes[0] as HTMLElement;
    }

    focusNode?.focus();
  }, [cursor, table.length]);

  const moveRight = (
    d: [number, number],
    key: 'ArrowRight' | 'Tab',
    event: React.KeyboardEvent
  ): [number, number] => {
    if (d[1] === tableSchema.length - 1) {
      if (d[0] === rowNums - 1) {
        if (key === 'ArrowRight') return d;

        if (!autoGrow) return [-1, -1];
      }

      event.preventDefault();

      return [d[0] + 1, 0];
    }

    return [d[0], d[1] + 1];
  };

  const moveLeft = (
    d: [number, number],
    key?: 'ArrowLeft' | 'Tab'
  ): [number, number] => {
    if (key === 'ArrowLeft' && d[0] === 0 && d[1] === 0) {
      return d;
    }

    return d[1] === 0 ? [d[0] - 1, tableSchema.length - 1] : [d[0], d[1] - 1];
  };

  const moveUp = (d: [number, number]): [number, number] => {
    return [d[0] === 0 ? 0 : d[0] - 1, d[1]];
  };

  const moveDown = (
    d: [number, number],
    key?: 'ArrowDown' | 'Enter'
  ): [number, number] => {
    if (!autoGrow || key === 'ArrowDown') {
      return [d[0] === rowNums - 1 ? d[0] : d[0] + 1, d[1]];
    }

    return [d[0] + 1, d[1]];
  };

  const onTabPress = (event: React.KeyboardEvent) => {
    setCursor(d => {
      if (d[0] === 0 && d[1] === 0 && event.shiftKey) {
        return [-1, -1];
      }

      if (d[0] === -1) {
        const result: [number, number] = event.shiftKey
          ? [table.length - 1, tableSchema.length - 1]
          : [0, 0];

        return result;
      }

      if (event.shiftKey) {
        return moveLeft(d);
      }

      return moveRight(d, 'Tab', event);
    });
  };

  const onEnterPress = (event: React.KeyboardEvent) => {
    setCursor(d => {
      return !event.shiftKey ? moveDown(d) : moveUp(d);
    });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      return setCursor(d => moveRight(d, 'ArrowRight', event));
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      return setCursor(d => moveLeft(d, 'ArrowLeft'));
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      return setCursor(d => moveDown(d, 'ArrowDown'));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      return setCursor(d => moveUp(d));
    }

    if (event.key === 'Tab') {
      return onTabPress(event);
    }

    if (event.key === 'Enter') {
      return onEnterPress(event);
    }
  };

  const updateCursor = (delX: number, delY: number) => {
    return setCursor([delX, delY]);
  };

  return (
    <div
      style={tableBodyStyle(styles?.tableBody)}
      className={classes?.tableBody}
      ref={tableBodyRef}
      onKeyDown={onKeyDown}
    >
      {table.map((row, i) => (
        <TableBodyRow
          key={i}
          row={row}
          rowNum={i}
          cursor={cursor}
          isSelected={cursor[0] === i}
          updateTableData={(colId: any, value: any) =>
            updateTableData(i, colId, value)
          }
          updateCursor={(delY: number) => updateCursor(i, delY)}
          tableSchema={tableSchema}
          classes={classes}
          styles={styles}
        />
      ))}
    </div>
  );
};
