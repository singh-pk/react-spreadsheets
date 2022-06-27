import type { FC } from 'react';

import type { TableHeadProps } from '../../libs/interface';

import { TableHeadRow } from '../TableRow/TableHeadRow';

import { tableHeadStyle } from '../../styles';

export const TableHead: FC<TableHeadProps> = props => {
  return (
    <div
      style={tableHeadStyle(props.styles?.tableHead)}
      className={props.classes?.tableHead}
    >
      <TableHeadRow {...props} />
    </div>
  );
};
