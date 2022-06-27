import type { CSSProperties } from 'react';

const rowStyles = {
  display: 'table-row',
  verticalAlign: 'middle'
};

const cellStyles = {
  display: 'table-cell',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  height: '100%',
  outline: 'none',
  paddingTop: '2px',
  paddingBottom: '2px',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  maxWidth: '8%'
};

const tableStyle = (styles?: CSSProperties): CSSProperties => ({
  display: 'table',
  width: '100%',
  maxWidth: '100%',
  ...styles
});

const tableHeadStyle = (styles?: CSSProperties): CSSProperties => ({
  display: 'table-header-group',
  ...styles
});

const tableHeadRowStyle = (styles?: CSSProperties): CSSProperties => ({
  ...rowStyles,
  ...styles
});

const tableHeadCellStyle = (styles?: CSSProperties): CSSProperties => ({
  ...cellStyles,
  ...styles
});

const tableBodyStyle = (styles?: CSSProperties): CSSProperties => ({
  display: 'table-row-group',
  ...styles
});

const tableBodyRowStyle = (styles?: CSSProperties): CSSProperties => ({
  ...rowStyles,
  ...styles
});

const tableBodyCellStyle = {
  cell: (styles?: CSSProperties): CSSProperties => ({
    ...cellStyles,
    ...styles
  }),
  select: (styles?: CSSProperties): CSSProperties => ({
    width: '100%',
    height: '100%',
    minHeight: '100%',
    border: 'none',
    outline: 'none',
    verticalAlign: 'middle',
    background: 'transparent',
    fontSize: '1rem',
    ...styles
  }),
  selectedCell: (styles?: CSSProperties): CSSProperties => ({
    border: '2px solid rgb(14, 101, 235)',
    paddingTop: '1px',
    paddingBottom: '1px',
    ...styles
  })
};

export {
  tableStyle,
  tableHeadStyle,
  tableHeadRowStyle,
  tableHeadCellStyle,
  tableBodyStyle,
  tableBodyRowStyle,
  tableBodyCellStyle
};
