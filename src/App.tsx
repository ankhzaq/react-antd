import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Grid from './components/Grid';
import { createServerFunc } from './helpers/mockServer';
import { endpoints } from './helpers/consts';

function App() {
  useEffect(() => {
    createServerFunc();
  }, []);
  return (
    <>
      <Header back />
      <Grid
        gridOptions={{
          columnDefs: [{
            headerName: "area", width: 100,
            field: "area",
          }],
          onGridReady: (params: any) => {
            debugger;
            fetch(endpoints.objectNoRules.url)
              .then((resp) => resp.json())
              .then((data) => {
                const dataSource = {
                  rowCount: null,
                  getRows: function (params: any) {
                    setTimeout( function() {
                      const lastRow = -1;
                      debugger;
                      params.successCallback(data.data.data);
                    }, 500);
                  }
                };
                params.api.setDatasource(dataSource);
              });
            /*
            const dataSource = {
              getRows: (params: any) => {
                agGridParams.api.showLoadingOverlay();
                const { endRow } = params;
                const page = (endRow / 500) - 1;

                let sortFilter = '';
                params.sortModel.forEach(((col: any) => {
                  const { colId, sort } = col;
                  sortFilter += '&';
                  sortFilter += `sortBy=${colId},${sort}`;
                }));
                fetch(
                  `${endpoints.objectNoRules.url}?pageSize=1000&paginationKey=${page >= 0 ? page : 0 }${sortFilter}`,
                  {
                    method: 'GET',
                    headers: {},
                  },
                ).then((resp) => resp.json())
                  .then((dataResponse) => {
                    agGridParams.api.hideOverlay();
                    const { data, pagination } = dataResponse;
                    const rowsThisPage = data ? data.data : [];
                    const lastRow = -1;
                    params.successCallback(rowsThisPage, lastRow);
                    agGridParams.api.setInfiniteRowCount(pagination.totalElements)
                  }).catch((error) => {
                    agGridParams.api.hideOverlay();
                    agGridParams.api.setInfiniteRowCount(0)
                    params.failCallback(error);
                  });
              },
            };
            agGridParams.api.setDatasource(dataSource);
            */
          }
        }}
        height={`${window.innerHeight * 0.9}px`}
      />
    </>
  );
}

export default App;
