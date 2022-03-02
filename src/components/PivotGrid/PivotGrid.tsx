import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

interface PivotGridProps {};

const defaultProps: PivotGridProps = {}

export const PivotGrid = (props = defaultProps) => {
  return (
    <DataGrid
      className="rdg-light"
      columns={columns}
      rows={rows}
    />
  );
}
