import 'antd/dist/antd.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';


interface HeaderProps {
  gridOptions: any,
  height: string,
};

const defaultProps: HeaderProps = {
  gridOptions: {},
  height: `${window.innerHeight}px`
}

export const Grid = (props = defaultProps) => {
  const { height, gridOptions, ...restProps } = props;

  const gridOptionsDefault = {
    defaultColDef: {
      resizable: true
    },
    cacheBlockSize: 500,
    debug: false,
    ebounceVerticalScrollbar: true,
    enableCellTextSelection: true,
    rowBuffer: 0,
    rowSelection: 'multiple',
    rowDeselection: true,
    rowModelType: 'infinite',
    paginationPageSize: 500,
    cacheOverflowSize: 1,
    maxConcurrentDatasourceRequests: 1,
    infiniteInitialRowCount: 1000,
    maxBlocksInCache: 2,
    ...gridOptions
  };
  return (
    <div className="ag-theme-alpine" style={{ height }} >
      <AgGridReact
        { ...gridOptionsDefault }
      >
      </AgGridReact>
    </div>
  );
}

Grid.defaultProps = {
  lang: 'en',
  title: 'Default title'
}
