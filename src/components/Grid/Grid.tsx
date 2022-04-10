import 'antd/dist/antd.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useRef } from 'react';


interface GridProps {
  gridOptions?: any,
  height: string,
  getGridRef?: (refGrid: any) => void
};

const defaultProps: GridProps = {
  gridOptions: {},
  height: `${window.innerHeight}px`
}

export const Grid = (props = defaultProps) => {
  const { height, gridOptions, getGridRef, ...restProps } = props;

  const gridRef = useRef(null);

  useEffect(() => {
    if (getGridRef) getGridRef(gridRef);
  }, []);

  const gridOptionsDefault = {
    defaultColDef: {
      resizable: true
    },
    cacheBlockSize: 1000,
    debug: false,
    ebounceVerticalScrollbar: true,
    enableCellTextSelection: true,
    rowBuffer: 0,
    rowSelection: 'multiple',
    rowDeselection: true,
    rowModelType: 'infinite',
    paginationPageSize: 1000,
    cacheOverflowSize: 1,
    maxConcurrentDatasourceRequests: 1,
    infiniteInitialRowCount: 1000,
    maxBlocksInCache: 2,
    ...gridOptions
  };
  return (
    <div className="ag-theme-alpine" style={{ height }} >
      <AgGridReact
        ref={gridRef}
        { ...gridOptionsDefault }
        {...restProps}
      >
      </AgGridReact>
    </div>
  );
}
