import { groupBy as rowGrouper } from 'lodash';
import 'react-data-grid/dist/react-data-grid.css';
import { useState } from 'react';
import { PivotGridStyled } from 'components/PivotGrid/style';

export interface PivotGridProps {
  columns: any[];
  height?: number;
  groupBy: string[];
  rows: any[];
};

const defaultProps: PivotGridProps = {
  columns: [],
  height: 500,
  groupBy: [],
  rows: []
}

export const PivotGrid = (props = defaultProps) => {
  const { columns, groupBy, height, rows } = props;

  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
    () => new Set<unknown>(['0'])
  );

  return (
    <PivotGridStyled
      className="rdg-light"
      columns={columns}
      expandedGroupIds={expandedGroupIds}
      groupBy={groupBy}
      height={height}
      onCopy={(props: any) => {
        debugger;
      }}
      onExpandedGroupIdsChange={setExpandedGroupIds}
      rowGrouper={rowGrouper}
      rows={rows}
    />
  );
}
