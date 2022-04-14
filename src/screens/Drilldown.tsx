import React, { useRef, useState } from 'react';
import Header from "components/Header";
import Grid from 'components/Grid';
import Toolbar from 'components/Toolbar';
import { useSelector } from 'react-redux';
import { endpoints, getDataWithoutRedux } from '../helpers/calls';

const PAGE_SIZE = 10000;

// refParamsGrid
let paramsGrid: any = null;

// Variable to save data when rc-dock is changing the layout
const localInfoGrid = {
  totalElements: null,
  data: [],
}

const COLUMNS = Object.keys(endpoints.drilldown_gridMetrics.mockup.data[0]);

function Drilldown() {
  const [totalElements, setTotalElements] = useState(0);
  let refGrid = useRef(null);

  const { drilldown = { gridMetrics: { data: {} } } } = useSelector((state: any) => state);
  const { gridMetrics: { data } } = drilldown;

  const getLocalDataNoRedux = async () => {
    debugger;
    if (!localInfoGrid.totalElements) {
      const baseUrl = endpoints.drilldown_gridMetrics.url;
      const filters = {};
      const { data, pagination } = await getDataWithoutRedux({ baseUrl, filters, refGrid, pageSize: PAGE_SIZE, paramsGrid });
      const dataGrid = data && (data.data || data);
      debugger;
      localInfoGrid.data = dataGrid;
      localInfoGrid.totalElements = pagination.totalElements;
      setTotalElements(pagination.totalElements);
    } else {
      setTotalElements(localInfoGrid.totalElements);
      paramsGrid.successCallback(localInfoGrid.data);
    }
  };

  return (
    <>
      <Header title="Drilldown" />
      <Toolbar>
        {`Search results | ${totalElements}`}
      </Toolbar>
      <Grid
        getGridRef={(gridRef) => {
          refGrid = gridRef;
        }}
        gridOptions={{
          columnDefs: COLUMNS.map((columnKey) => ({
            headerName: columnKey,
            field: columnKey,
            filter: true,
            flex: 1,
            sortable: true,
          })),
          onGridReady: async (params: any) => {
            try {

              const dataSource = {
                rowCount: null,
                getRows: function (params: any) {
                  paramsGrid = params;
                  getLocalDataNoRedux();
                }
              };
              params.api.setDatasource(dataSource);
            } catch (e) {
            }
          }
        }}
        height={`${window.innerHeight * 0.9}px`}
      />
    </>
  );
}

export default Drilldown;
