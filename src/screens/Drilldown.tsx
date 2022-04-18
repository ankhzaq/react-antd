import React, { useEffect, useRef, useState } from 'react';
import Header from "components/Header";
import Grid from 'components/Grid';
import Toolbar from 'components/Toolbar';
import { connect, useSelector } from 'react-redux';
import { endpoints, getDataWithoutRedux } from '../helpers/calls';
import GraphicStorageZones from 'components/drilldown/GraphicStorageZones';
import { BasicObject } from 'interfaces/common';

const PAGE_SIZE = 10000;

// refParamsGrid
let paramsGrid: any = null;
let paramsGridTop: any = null;

// Variable to save data when rc-dock is changing the layout
const localInfoGrid: BasicObject = {
  drilldown_gridMetrics: {},
  drilldown_gridStatusByObject: {}
}

const COLUMNS = Object.keys(endpoints.drilldown_gridMetrics.mockup.data[0]);
const COLUMNS_TOPGRID = Object.keys(endpoints.drilldown_gridStatusByObject.mockup.data[0]);

interface propsDrilldown {
  getData: () => void
}

function Drilldown(props: propsDrilldown) {
  const { getData } = props;
  const [totalElements, setTotalElements] = useState(0);
  let refGrid = useRef(null);
  let refGridTop = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const { drilldown = { gridMetrics: { data: {} } } } = useSelector((state: any) => state);
  const { gridMetrics: { data }, graphicStorageZones } = drilldown;

  const getLocalDataNoRedux = async (id: string, params: any, refGridToUpdate: any) => {
    if (!localInfoGrid[id].totalElements) {
      const baseUrl = endpoints[id].url;
      const filters = {};
      const { data, pagination } = await getDataWithoutRedux({ baseUrl, filters, refGrid: refGridToUpdate, pageSize: PAGE_SIZE, paramsGrid: params });
      const dataGrid = data && (data.data || data);
      localInfoGrid[id].data = dataGrid;
      localInfoGrid[id].totalElements = pagination.totalElements;
      setTotalElements(pagination.totalElements);
    } else {
      setTotalElements(localInfoGrid[id].totalElements);
      params.successCallback(localInfoGrid[id].data);
    }
  };

  return (
    <>
      <Header title="Drilldown" />
      <Toolbar>
        {`Search results | ${totalElements}`}
      </Toolbar>
      <div className="flex-column">
        <div className="flex-row flex1">
          <GraphicStorageZones />
          <Grid
            getGridRef={(gridRef) => {
              refGridTop = gridRef;
            }}
            gridOptions={{
              columnDefs: COLUMNS_TOPGRID.map((columnKey) => ({
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
                      paramsGridTop = params;
                      getLocalDataNoRedux("drilldown_gridStatusByObject", params, refGridTop);
                    }
                  };
                  params.api.setDatasource(dataSource);
                } catch (e) {
                }
              },
            }}
            height={`${window.innerHeight * 0.45}px`}
            width="100%"
          />
        </div>
        <div className="flex1">
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
                      getLocalDataNoRedux("drilldown_gridMetrics", params, refGrid);
                    }
                  };
                  params.api.setDatasource(dataSource);
                } catch (e) {
                }
              }
            }}
            height={`${window.innerHeight * 0.45}px`}
          />
        </div>
      </div>
      </>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  getData: () => {
    dispatch({
      type: 'drilldown_graphicStorageZones_requested',
      payload: {}
    });
    /*dispatch({
      type: 'drilldown_gridStatusByObject_requested',
      payload: {}
    });*/
  }
});

export default connect(null, mapDispatchToProps)(Drilldown);
