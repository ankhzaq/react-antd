import React, { useEffect, useRef, useState } from 'react';
import { Pie } from '@ant-design/plots';
import { useSelector } from 'react-redux';
import Grid from 'components/Grid';
import { endpoints, getDataWithoutRedux } from '../../helpers/calls';
import { BasicObject } from '../../interfaces/common';

interface GridStatusByObject {
  getData: () => void;
}

const COLUMNS = Object.keys(endpoints.drilldown_gridMetrics.mockup.data[0]);
const PAGE_SIZE = 10000;

const config: any = {
  appendPadding: 10,
  angleField: 'numJobs',
  colorField: 'storageZoneType',
  radius: 1,
  innerRadius: 0.6,
  label: {
    autoRotate: false,
    type: 'inner',
    offset: '-50%',
    style: {
      textAlign: 'center',
      fontSize: 14,
    },
  },
  interactions: [
    {
      type: 'element-selected',
    },
    {
      type: 'element-active',
    },
  ],
  statistic: {
    title: false,
    content: {
      style: {
        whiteSpace: 'pre-wrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      content: 'AntV\nG2Plot',
    },
  },
};

const localInfoGrid: BasicObject = {}

const GridMetrics = () => {

  const [totalElements, setTotalElements] = useState(0);

  let refGrid = useRef(null);

  const { drilldown } = useSelector((state: any) => state);
  const { graphicStorageZones: { data } } = drilldown;

  const getLocalDataNoRedux = async (params: any, refGridToUpdate: any) => {
    if (!localInfoGrid.totalElements) {
      const baseUrl = endpoints.drilldown_gridMetrics.url;
      const filters = {};
      const { data, pagination } = await getDataWithoutRedux({ baseUrl, filters, refGrid: refGridToUpdate, pageSize: PAGE_SIZE, paramsGrid: params });
      const dataGrid = data && (data.data || data);
      localInfoGrid.data = dataGrid;
      localInfoGrid.totalElements = pagination.totalElements;
      setTotalElements(pagination.totalElements);
    } else {
      setTotalElements(localInfoGrid.totalElements);
      params.successCallback(localInfoGrid.data);
    }
  };

  if (data && data.data) {
    config.data = data.data;
  }

  return (
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
                getLocalDataNoRedux(params, refGrid);
              }
            };
            params.api.setDatasource(dataSource);
          } catch (e) {
          }
        }
      }}
      height="100%"
    />
  );
};

export default GridMetrics;
