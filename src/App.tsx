import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Grid from './components/Grid';
import { createServerFunc } from './helpers/mockServer';
import { endpoints } from './helpers/consts';
import { ResponseObjectNoRules } from './interfaces/ObjectNoRules';

function App() {
  useEffect(() => {
    createServerFunc();
  }, []);

  // @ts-ignore
  const mockupResponse: ResponseObjectNoRules = endpoints.objectNoRules.mockup;
  const columns = Object.keys(mockupResponse.data[0]);
  return (
    <>
      <Header title="Objects no rules" />
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
            fetch(endpoints.objectNoRules.url)
              .then((resp) => resp.json())
              .then((response) => {
                const dataSource = {
                  rowCount: null,
                  getRows: function (params: any) {
                    setTimeout( function() {
                      const lastRow = -1;
                      params.successCallback(response.data.data);
                    }, 500);
                  }
                };
                params.api.setDatasource(dataSource);
              });
          }
        }}
        height={`${window.innerHeight * 0.9}px`}
      />
    </>
  );
}

export default App;
