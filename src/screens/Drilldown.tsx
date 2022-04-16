import React, { useEffect, useRef, useState } from 'react';
import Header from "components/Header";
import Grid from 'components/Grid';
import Toolbar from 'components/Toolbar';
import { connect, useSelector } from 'react-redux';
import { endpoints, getDataWithoutRedux } from '../helpers/calls';
import GraphicStorageZones from 'components/drilldown/GraphicStorageZones';

const PAGE_SIZE = 10000;

// refParamsGrid
let paramsGrid: any = null;

// Variable to save data when rc-dock is changing the layout
const localInfoGrid = {
  totalElements: null,
  data: [],
}

const COLUMNS = Object.keys(endpoints.drilldown_gridMetrics.mockup.data[0]);

interface propsDrilldown {
  getData: () => void
}

function Drilldown(props: propsDrilldown) {
  const { getData } = props;
  const [totalElements, setTotalElements] = useState(0);
  let refGrid = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const { drilldown = { gridMetrics: { data: {} } } } = useSelector((state: any) => state);
  const { gridMetrics: { data }, graphicStorageZones } = drilldown;

  const getLocalDataNoRedux = async () => {
    if (!localInfoGrid.totalElements) {
      const baseUrl = endpoints.drilldown_gridMetrics.url;
      const filters = {};
      const { data, pagination } = await getDataWithoutRedux({ baseUrl, filters, refGrid, pageSize: PAGE_SIZE, paramsGrid });
      const dataGrid = data && (data.data || data);
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
      <div className="flex-column">
        <div className="flex1">
          <GraphicStorageZones />
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
                      getLocalDataNoRedux();
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
  getData: () => dispatch({
    type: 'drilldown_graphicStorageZones_requested',
    payload: {}
  })
});

export default connect(null, mapDispatchToProps)(Drilldown);
