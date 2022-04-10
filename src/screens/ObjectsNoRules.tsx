import React, { useEffect, useState } from 'react';
import Header from "components/Header";
import Grid from 'components/Grid';
import { createServerFunc } from 'helpers/mockServer';
import { endpoints, heights } from 'helpers/consts';
import { ResponseObjectNoRules } from 'interfaces/ObjectNoRules';
import Toolbar from 'components/Toolbar';
import { connect, useSelector } from 'react-redux';
import { parseFilterObject } from '../helpers/filters';
import { BasicObject } from 'interfaces/common';

let totalElementsGrid: number = 0;
let paramsGrid: any = null;
let gridRef: any = null;

function ObjectsNoRules() {
  const { objectsNoRules } = useSelector((state: any) => state);
  const { filters: {dateUpdated, data: filters } } = objectsNoRules;

  const getData = async () => {
    const filtersParsed = parseFilterObject(filters);
    const url = `${endpoints.objectNoRules.url}${filtersParsed.length ? `?search=${filtersParsed}`: ''}`;
    const response = await fetch(url)
      .then((resp) => resp.json())
      .then((response) => response);

    const { data, pagination } = response;
    const refGrid = gridRef;
    if (refGrid.current) {
      const columnsDef = refGrid.current.columnApi.columnModel.getColumnDefs();
      const activeDisableFilters = columnsDef[0].filter !== (pagination.totalElements <= 1000);
      debugger;
      if (activeDisableFilters) {
        const filterSortActived = pagination.totalElements <= 1000;
        const nextColumnsDef = columnsDef.map((columnDef: BasicObject) => ({ ...columnDef, filter: filterSortActived, sortable: filterSortActived   }))
        debugger;
        refGrid.current.columnApi.columnModel.setColumnDefs(nextColumnsDef)
      }
    }
    setTotalElements(pagination.totalElements);
    paramsGrid.successCallback(data);
  };

  // @ts-ignore
  useEffect(() => {
    getData();
  }, [dateUpdated]);

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
    <div className="flex-column">
      <div className="flex1">
        <Header title="Objects no rules" />
      </div>
      <div className="flex1">
        <Toolbar>
          Search results | {totalElements === null ? '...' : totalElements}
        </Toolbar>
      </div>
      <div className="flex1">
        <Grid
          getGridRef={(refGrid) => {
            gridRef = refGrid;
          }}
          /* @ts-ignore */
          gridOptions={{
            columnDefs: columns.map((columnKey) => ({
              headerName: columnKey,
              field: columnKey,
              filter: false,
              flex: 1,
              sortable: false,
            })),
            onGridReady: async (params: any) => {
              try {
                const dataSource = {
                  rowCount: null,
                  getRows: function (params: any) {
                    paramsGrid = params;
                    getData();
                  }
                };
                params.api.setDatasource(dataSource);
              } catch (e) {
              }
            }
          }}
          height={`${window.innerHeight - heights.header - heights.toolbar- heights.dockbox}px`}
        />
      </div>
    </div>
  );
}

export default connect()(ObjectsNoRules);
