import React, { useEffect, useState } from 'react';
// @ts-ignore
import Header from "components/Header";
// @ts-ignore
import Grid from 'components/Grid';
// @ts-ignore
import { createServerFunc } from 'helpers/mockServer';
// @ts-ignore
import { endpoints } from 'helpers/consts';
// @ts-ignore
import { ResponseObjectNoRules } from 'interfaces/ObjectNoRules';
// @ts-ignore
import Toolbar from 'components/Toolbar';


let totalElementsGrid: number = 0;
function ObjectsNoRules() {
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
                      if (!totalElementsGrid || params.startRow < totalElementsGrid) {
                        params.successCallback(response.data);
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

export default ObjectsNoRules;
