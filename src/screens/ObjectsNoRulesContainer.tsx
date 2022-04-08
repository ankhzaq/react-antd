import React from 'react';
import { connect, useSelector } from 'react-redux'
import 'antd/dist/antd.css';
import DockLayout from 'rc-dock';
import Filters from 'components/Filters';

import ObjectsNoRules from './ObjectsNoRules';
import FooterFilter from 'components/Filters/FooterFilter';

import { setFiltersAction } from '../store/actions/objectsNoRules';

const INITIAL_FILTER = {};

let filters = INITIAL_FILTER;

function ObjectsNoRulesContainer(props: { setFilters: (payload: any) => void }) {
  const { setFilters } = props;

  const { common = {} } = useSelector((state: any) => state);


  const layoutDock: any = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          mode: 'horizontal',
          children: [{
            mode: 'horizontal',
            size: 200,
            children: [
              {
                tabs: [
                  {id: 'filters', title: 'Filters', content: <Filters
                      filters={[
                        {
                          element: "Select",
                          key: 'creationDate',
                          options: [{ label: 'date1', value: 'date1'},{ label: 'date2', value: 'date2'},{ label: 'date3', value: 'date3'},{ label: 'date4', value: 'date4'}],
                          placeholder: 'Creation date'
                        },
                        {
                          element: "Select",
                          key: 'country',
                          options: common.countries.data && common.countries.data.map((country: string) => ({ label: country, value: country})),
                          placeholder: 'Country'
                        },
                        {
                          element: "Select",
                          key: 'storageZone',
                          options: common.countries.data && common.storageZones.data.map((storageZone: string) => ({ label: storageZone, value: storageZone})),
                          placeholder: 'Storage zone'
                        },
                        {
                          element: 'Input',
                          key: 'uuaa',
                          placeholder: 'UA'
                        },
                        {
                          element: 'Input',
                          key: 'area',
                          placeholder: 'Area'
                        },
                        {
                          element: <FooterFilter
                            onClearClick={() => {
                              setFilters({ data: INITIAL_FILTER, dateUpdated: new Date().getTime() });
                            }}
                            onFilterClick={() => {
                              setFilters({ data: filters, dateUpdated: new Date().getTime() });
                            }}
                          />,
                        },
                      ]}
                      getFilters={(filtersFromFilterComponent: any) => {
                        filters = filtersFromFilterComponent;
                      }}
                    />}
                ],
              },
            ]
          },
          ],
        },
        {
          size: 1000,
          tabs: [
            {id: 'objectNoRules', title: 'Object No Rules', content: <ObjectsNoRules />}
          ]
        }
      ]
    }
  };

  return (
    <DockLayout
      defaultLayout={layoutDock}
      style={{
        position: "absolute",
        left: 10,
        top: 10,
        right: 10,
        bottom: 10,
      }}
    />
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  setFilters: (props: any) => dispatch(setFiltersAction(props))
});

export default connect(null, mapDispatchToProps)(ObjectsNoRulesContainer);
