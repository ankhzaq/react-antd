import { parseFilterObject } from './filters';
import { BasicObject } from '../interfaces/common';
import mockupHammurabi from '../mockups/hammurabi.json';

import mockupHammurabi_today from '../mockups/hammurabi_today.json';
import mockupHammurabi_yesterday from '../mockups/hammurabi_yesterday.json';
import mockupHammurabi_lastDayOfMonth from '../mockups/hammurabi_lastDayOfMonth.json';
import mockupHammurabi_lastDayOfQuarter from '../mockups/hammurabi_lastDayOfQuarter.json';

import mockupHammurabigraphicRules from '../mockups/hammurabiGraphicRules.json';
import mockupObjectsNoRules from '../mockups/objectsNoRules.json';
import mockupDrilldownGridMetrics from '../mockups/drilldownGridMetrics.json';
import mockupDrilldownGraphicStorageZones from '../mockups/graphicStorageZones.json';
import mockupDrilldownGridStatusByObject from '../mockups/drilldownGridStatusByObject.json';
import { constants } from './consts';

interface GenericReduxProps {
  baseUrl: string;
  filters: any;
  refGrid: any;
  pageSize: number;
  paramsGrid: any;
}

export const commonHeader = {
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  accept: 'application/json'
};

export const getDataWithoutRedux = async (props: GenericReduxProps) => {
  const { baseUrl, filters, refGrid, pageSize, paramsGrid } = props;
  // Parse filters
  const filtersParsed = parseFilterObject(filters);
  // Url parsed with pageSize and filters
  const url = `${baseUrl}?pageSize=${pageSize}${filtersParsed.length ? `&search=${filtersParsed}`: ''}`;

  // Generic call
  const response = await fetch(url)
    .then((resp) => resp.json())
    .then((response) => response);

  // Destructurate the response
  const { data, pagination } = response;

  // Update aggrid with by reference
  if (refGrid && refGrid.current) {
    // Get columns
    const columnsDef = refGrid.current.columnApi.columnModel.getColumnDefs();
    const filterSortActived = pagination.totalElements <= pageSize;

    // Check if local filters should be enable/disable (only if Front has the whole information)
    const activeDisableFilters = columnsDef[0].filter !== filterSortActived;

    // Active or disable filters
    if (activeDisableFilters) {
      // Update column properties
      const propertiesToChange = { filter: filterSortActived, sortable: filterSortActived  };
      const nextColumnsDef = columnsDef.map((columnDef: BasicObject) => ({ ...columnDef, ...propertiesToChange   }));
      // Update aggrid columns by ref
      refGrid.current.columnApi.columnModel.setColumnDefs(nextColumnsDef)
    }
  }
  // Contemplate the two posibles responses
  const dataGrid = data && (data.data || data)
  // notify to aggrid that the call has finished successfully
  paramsGrid.successCallback(dataGrid);

  return response;
};

const pathDQ = '/api';
const pathMicroNBX = 'nbx';
const pathMicroNotifications = 'notifications';

export const endpoints: BasicObject = {
  hammurabi: {
    url: `${pathDQ}/${pathMicroNBX}/pathMicroNBX`,
    mockup: mockupHammurabi
  },
  hammurabi_today: {
    url: `${pathDQ}/${pathMicroNBX}/today`,
    mockup: mockupHammurabi_today.data
  },
  hammurabi_yesterday: {
    url: `${pathDQ}/${pathMicroNBX}/yesterday`,
    mockup: mockupHammurabi_yesterday.data
  },
  hammurabi_lastDayOfMonth: {
    url: `${pathDQ}/${pathMicroNBX}/lastMonth`,
    mockup: mockupHammurabi_lastDayOfMonth.data
  },
  hammurabi_lastDayOfQuarter: {
    url: `${pathDQ}/${pathMicroNBX}/lastDayOfQuarter`,
    mockup: mockupHammurabi_lastDayOfQuarter.data
  },
  hammurabiGraphicRules: {
    url: `${pathDQ}/${pathMicroNBX}/hammurabi-rules`,
    mockup: mockupHammurabigraphicRules
  },
  objectNoRules: {
    url: `${pathDQ}/${pathMicroNotifications}/objects-without-rules`,
    mockup: mockupObjectsNoRules
  },
  drilldown_gridMetrics: {
    url: `${pathDQ}/${pathMicroNBX}/streaming-object`,
    mockup: mockupDrilldownGridMetrics
  },
  drilldown_graphicStorageZones: {
    genericSagas: true,
    mockup: mockupDrilldownGraphicStorageZones,
    url: `${pathDQ}/${pathMicroNBX}/drilldown-graphic-storage-zones`,
  },
  drilldown_gridStatusByObject: {
    mockup: mockupDrilldownGridStatusByObject,
    url: `${pathDQ}/${pathMicroNBX}/drilldown-status-by-object`,
  }
}
