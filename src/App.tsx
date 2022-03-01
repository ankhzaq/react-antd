import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Grid from './components/Grid';
import { createServerFunc } from './helpers/mockServer';
import { endpoints } from './helpers/consts';
import { ResponseObjectNoRules } from './interfaces/ObjectNoRules';
import Toolbar from './components/Toolbar';


let totalElementsGrid: number = 0;
function App() {
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    createServerFunc();
  }, []);

  useEffect(() => {
    totalElementsGrid = totalElements;
  }, [totalElements]);

  // @ts-ignore
  const mockupResponse: ResponseObjectNoRules = endpoints.objectNoRules.mockup;
  const columns = Object.keys(mockupResponse.data[0]);
  return (
    <>
      <Header title="Objects no rules" />
      <Toolbar>
        Search results | {totalElements === null ? '...' : totalElements}
      </Toolbar>
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
                      debugger;
                      if (!totalElementsGrid || params.startRow < totalElementsGrid) {
                        params.successCallback(response.data.data);
                        setTotalElements(response.pagination.totalElements);
                      }
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
