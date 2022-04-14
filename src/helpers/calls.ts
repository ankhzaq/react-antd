import { parseFilterObject } from './filters';
import { BasicObject } from '../interfaces/common';
import mockupHammurabi from '../mockups/hammurabi.json';
import mockupHammurabigraphicRules from '../mockups/hammurabiGraphicRules.json';
import mockupObjectsNoRules from '../mockups/objectsNoRules.json';
import mockupDrilldownGridMetrics from '../mockups/drilldownGridMetrics.json';

interface GenericReduxProps {
  baseUrl: string;
  filters: any;
  refGrid: any;
  pageSize: number;
  paramsGrid: any;
}

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
  }
}
