import { groupBy as rowGrouper } from 'lodash';
import 'react-data-grid/dist/react-data-grid.css';
import { useEffect, useState } from 'react';
import { PivotGridStyled } from 'components/PivotGrid/style';

export interface PivotGridProps {
  columns: any[];
  height?: number;
  groupBy: string[];
  restProps?: object;
  rows: any[];
};

const defaultProps: PivotGridProps = {
  columns: [],
  height: 500,
  groupBy: [],
  restProps: {},
  rows: []
}

export const PivotGrid = (props = defaultProps) => {
  const { columns, groupBy, height, restProps, rows } = props;

  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
    () => new Set<unknown>(['0'])
  );

  return (
    <PivotGridStyled
      className="rdg-light"
      columns={columns}
      defaultColumnOptions={{ resizable: true }}
      expandedGroupIds={expandedGroupIds}
      groupBy={groupBy}
      height={height}
      onExpandedGroupIdsChange={setExpandedGroupIds}
      rowGrouper={rowGrouper}
      rows={rows}
      {...restProps}
    />
  );
}
