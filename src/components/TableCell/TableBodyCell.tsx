import { createElement } from 'react';
import type {
  FC,
  FocusEvent,
  KeyboardEvent,
  DragEvent,
  MouseEvent
} from 'react';

import type { TableBodyCellProps } from '../../libs/types';

import { tableBodyCellStyle } from '../../styles';

export const TableBodyCell: FC<TableBodyCellProps> = ({
  type,
  data,
  isSelected,
  readOnly,
  updateTableData,
  updateCursor,
  dataFormator,
  options,
  classes,
  styles
}) => {
  const isSelectComp = type === 'select';

  const ifSelectComp = (val: any) => (isSelectComp ? val : '');

  const createAndAddRange = (element: HTMLDivElement) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.addRange(range);
  };

  const removeSelection = () => window.getSelection()?.removeAllRanges();

  const onFocus = (event: FocusEvent) => {
    event.preventDefault();
    removeSelection();
  };

  const setTableCellData = (data: number | string) => {
    if (type === 'number') {
      data = Number(data);
      if (isNaN(data)) return;
    }

    data = type !== 'select' && dataFormator ? dataFormator(data) : data;

    updateTableData(data);
  };

  const onBlur = (event: FocusEvent) => {
    event.preventDefault();

    let data: number | string;

    if (!isSelectComp) {
      data = (event.target as HTMLDivElement).innerText;
    } else {
      data = (event.target as HTMLSelectElement).value;
    }

    if (data) setTableCellData(data);

    removeSelection();
  };

  const typeNumber = (event: KeyboardEvent) => {
    if (
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey &&
      event.key.length === 1 &&
      !event.key.match(/[0-9|.|,|+|e|-]/)
    ) {
      event.preventDefault();
    }
  };

  const onEnterPress = (event: KeyboardEvent) => {
    const selection = window.getSelection();

    if (readOnly || selection?.focusNode) {
      return removeSelection();
    }

    event.stopPropagation();

    if (isSelectComp) {
      return;
    }

    event.preventDefault();

    return createAndAddRange(event.target as HTMLDivElement);
  };

  const handleCopyPaste = async (event: KeyboardEvent) => {
    if (event.key === 'c') {
      navigator.clipboard.writeText((event.target as HTMLDivElement).innerText);
    }

    if (event.key === 'v') {
      updateTableData(await navigator.clipboard.readText());
    }
  };

  const handleDelete = () => {
    if (!isSelectComp && !readOnly) updateTableData('');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && (event.key === 'c' || event.key === 'v')) {
      return handleCopyPaste(event);
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      return handleDelete();
    }

    if (event.key === 'Enter') {
      return onEnterPress(event);
    }

    if (type === 'number') {
      return typeNumber(event);
    }
  };

  const onMouseDown = (event: MouseEvent) => {
    updateCursor();
    if (readOnly) event.preventDefault();
  };

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData(
      'draggedData',
      (event.target as HTMLDivElement).innerText
    );
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('draggedData');
    setTableCellData(data);
    updateCursor();
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDragLeave = (event: DragEvent) => {
    event.preventDefault();
  };

  const props = {
    style: {
      ...(!isSelectComp
        ? tableBodyCellStyle.cell(styles?.tableBodyCell)
        : tableBodyCellStyle.select(styles?.tableBodyCellSelect)),
      ...(!isSelectComp && isSelected
        ? tableBodyCellStyle.selectedCell(styles?.tableBodyCellSelected)
        : {})
    },
    className: `${
      (!isSelectComp ? classes?.tableBodyCell : classes?.tableBodyCellSelect) ??
      ''
    } ${(!isSelectComp && isSelected && classes?.tableBodyCellSelected) || ''}`,
    onFocus: onFocus,
    onBlur: onBlur,
    onMouseDown: onMouseDown,
    onKeyDown: handleKeyDown,
    contentEditable: true,
    defaultValue: ifSelectComp(data),
    suppressContentEditableWarning: true,
    draggable: !readOnly && !isSelectComp,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onDragOver: onDragOver,
    onDragLeave: onDragLeave
  };

  const getOptions = () => {
    return options?.map((props: any, i: number) => (
      <option {...props} key={i} />
    ));
  };

  const element = createElement(
    type === 'select' ? 'select' : 'div',
    props,
    !isSelectComp ? data ?? '' : getOptions()
  );

  return isSelectComp ? (
    <div
      style={{
        ...tableBodyCellStyle.cell(styles?.tableBodyCell),
        paddingLeft: '0.25rem',
        paddingRight: '0.25rem',
        ...(isSelected &&
          tableBodyCellStyle.selectedCell(styles?.tableBodyCellSelected))
      }}
      className={`${classes?.tableBodyCell ?? ''} ${
        (isSelected && classes?.tableBodyCellSelected) || ''
      }`}
    >
      {element}
    </div>
  ) : (
    element
  );
};
