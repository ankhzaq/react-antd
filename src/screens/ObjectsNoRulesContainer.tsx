import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux'
import 'antd/dist/antd.css';
import DockLayout from 'rc-dock';
import Filters from 'components/Filters';

import ObjectsNoRules from './ObjectsNoRules';
import FooterFilter from 'components/Filters/FooterFilter';

import { setFiltersAction } from '../store/actions/objectsNoRules';
import { BasicObject } from 'interfaces/common';

const INITIAL_FILTER = {};
const CONSTANTS = {
  filters: {
    id: 'filters',
    title: 'Filters'
  },
  objectNoRules: {
    id: 'objectNoRules',
    title: 'Object No Rules'
  }
}

let localFilters = INITIAL_FILTER;
let filterUpdatedControlledByComponent = true;

function ObjectsNoRulesContainer(props: { setFilters: (payload: any) => void }) {
  const { setFilters } = props;
  const refDockbox = useRef(null);

  const { common = {}, objectsNoRules } = useSelector((state: any) => state);
  const {  filters: { data: filters, dateUpdated } } = objectsNoRules;

  useEffect(() => {
    if (!filterUpdatedControlledByComponent) {
      const content = getContentFilters(INITIAL_FILTER);
      // @ts-ignore
      refDockbox.current.updateTab('filters', {id: 'filters', title: 'Filters', content });
    } else {
      filterUpdatedControlledByComponent = false;
    }
  }, [dateUpdated])

  const getContentFilters = (data: BasicObject = {}) => {
    const filtersElements = [
      {
        element: "Select",
        key: 'creationDate',
        options: [{ label: 'date1', value: 'date1'},{ label: 'date2', value: 'date2'},{ label: 'date3', value: 'date3'},{ label: 'date4', value: 'date4'}],
        placeholder: 'Creation date'
      },
      {
        element: "Select",
        key: 'countryId',
        options: common.countries.data && common.countries.data.map((country: string) => ({ label: country, value: country})),
        placeholder: 'Country',
        value: data.countryId
      },
      {
        element: "Select",
        key: 'storageZoneType',
        options: common.countries.data && common.storageZones.data.map((storageZone: string) => ({ label: storageZone, value: storageZone})),
        placeholder: 'Storage zone'
      },
      {
        element: 'Input',
        key: 'uuaaId',
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

            // @ts-ignore
            refDockbox.current.updateTab('filters', {id: CONSTANTS.filters.id, title: CONSTANTS.filters.title, content: <div>Cleaning...</div>})
            filterUpdatedControlledByComponent = false;
          }}
          onFilterClick={() => {
            filterUpdatedControlledByComponent = true;
            setFilters({ data: localFilters, dateUpdated: new Date().getTime() });
          }}
        />,
      },
    ];
    const contentFilters = (<Filters
      filters={filtersElements}
      getFilters={(filtersFromFilterComponent: any) => {
        localFilters = filtersFromFilterComponent;
      }}
    />);
    return contentFilters;
  }

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
                  {id: CONSTANTS.filters.id, title: CONSTANTS.filters.title, content: getContentFilters(filters)}
                ],
              },
            ]
          },
          ],
        },
        {
          size: 1000,
          tabs: [
            {id: CONSTANTS.objectNoRules.id, title: CONSTANTS.objectNoRules.title, content: <ObjectsNoRules />}
          ]
        }
      ]
    }
  };

  return (
    <DockLayout
      ref={refDockbox}
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
