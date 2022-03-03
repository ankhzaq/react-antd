import DataGrid from 'react-data-grid';
import { groupBy as rowGrouper } from 'lodash';
import 'react-data-grid/dist/react-data-grid.css';
import { useState } from 'react';

interface PivotGridProps {
  columns: any[];
  groupBy: string[];
  rows: any[];
};

const defaultProps: PivotGridProps = {
  columns: [],
  groupBy: [],
  rows: []
}

export const PivotGrid = (props = defaultProps) => {
  const { columns, groupBy, rows } = props;

  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(
    () => new Set<unknown>(['0'])
  );

  return (
    <DataGrid
      className="rdg-light"
      columns={columns}
      expandedGroupIds={expandedGroupIds}
      groupBy={groupBy}
      onExpandedGroupIdsChange={setExpandedGroupIds}
      rowGrouper={rowGrouper}
      rows={rows}
    />
  );
}
