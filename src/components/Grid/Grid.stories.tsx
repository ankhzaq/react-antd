import React from 'react';
import { Grid } from './Grid';
import { BrowserRouter } from 'react-router-dom';
import { endpoints } from '../../helpers/consts';
import { ResponseObjectNoRules } from '../../interfaces/ObjectNoRules';

export default {
  title: 'Grid',
  component: Grid,
};

export const Default = () => {
  // @ts-ignore
  const mockupResponse: ResponseObjectNoRules = endpoints.objectNoRules.mockup;
  const columns = Object.keys(mockupResponse.data[0]);
  return (
    <BrowserRouter>
      <Grid
        gridOptions={{
          columnDefs: columns.map((columnKey) => ({
            headerName: columnKey,
            field: columnKey,
            filter: true,
            flex: 1,
            sortable: true,
          })),
          onGridReady: (params: any) => {
            const dataSource = {
              rowCount: null,
              getRows: function (params: any) {
                params.successCallback(mockupResponse.data);
              }
            };
            params.api.setDatasource(dataSource);
          }
        }}
        height={`${window.innerHeight * 0.9}px`}
      />
    </BrowserRouter>
  );
};
