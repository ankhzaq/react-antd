import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Header from "components/Header";
import { createServerFunc } from 'helpers/mockServer';
import PivotGrid from 'components/PivotGrid';
import { constants, endpoints, heights } from '../helpers/consts';
import { PivotGridProps } from 'components/PivotGrid/PivotGrid';
import { Button, Checkbox, Select } from 'antd';
import 'antd/dist/antd.css';
import { BasicObject } from '../interfaces/common';
import { getSessionStorage, setSessionStorage } from '../helpers/sessionStorage';
import Toolbar from 'components/Toolbar';

const defaultInfoGrid: PivotGridProps = {
  rows: [],
  columns: [],
  groupBy: ['country', 'area', 'storageZone']
};

const defaultFilters = {
  area: [],
  country: [],
  storageZone: [],
};

interface Filter {
  area: string[];
  country: string[];
  storageZone: string[];
}

function Hammurabi() {
  const [infoGrid, setInfoGrid] = useState(defaultInfoGrid);
  const [filters, setFilters] = useState<Filter>(defaultFilters);

  const setNewFilters = (newFilters: any) => {
    setSessionStorage("filters", newFilters);
    setFilters(newFilters);
  }

  useEffect(() => {
    setSessionStorage("filters", filters);
  }, [filters])

  const filteredRows = useMemo(() => {
    return infoGrid.rows.filter((r) => {
      const { area, country, storageZone } = r;
      const { area: areaFilter, country: countryFilter, storageZone: storageZoneFilter } = filters;
      const validArea = !area || !areaFilter.length || areaFilter.includes(area);
      const validCountry = !country || !countryFilter.length || countryFilter.includes(country);
      const validStoragezone = !storageZone || !storageZoneFilter.length || storageZoneFilter.includes(storageZone);
      return (validArea && validCountry && validStoragezone);
    });
  }, [infoGrid.rows, filters]);

  const { rows, columns, groupBy } = infoGrid;

  useEffect(() => {
    createServerFunc();
    fetch(endpoints.hammurabi.url)
      .then((resp) => resp.json())
      .then((response) => {
        const rows = response.data;
        const firstElement = rows[0];
        if (firstElement) {
          const columns = Object.keys(firstElement).filter((key) => key.includes('Count') || infoGrid.groupBy.includes(key));
          const columnsResponse = columns.map((key: string) => ({
            headerRenderer: (info: any) => {
              const { column: { name } } = info;
              if (!infoGrid.groupBy.includes(name))
                return (
                  <span>{name}</span>
                );
              const options: string[] = [];
              rows.forEach((rowInfo: any) => {
                const value = rowInfo[key];
                const alreadyExist = value && options.includes(value);
                if (value && !alreadyExist) options.push(value);
              });

              const filtersSession = getSessionStorage("filters");

              return (
                <Select
                  defaultValue={filtersSession[key]}
                  mode="multiple"
                  onChange={(value) => {
                    const newFilters = { ...filtersSession };
                    // @ts-ignore
                    newFilters[key] = value;
                    setNewFilters(newFilters);
                  }}
                  placeholder={key}
                  style={{ width: '100%' }}
                >
                  {options.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </Select>
              );
            },
            key,
            groupFormatter: function (props: any) {
              const { childRows, groupKey } = props;
              if (!key.includes('Count')) return <>{groupKey}</>;
              return (
                <Button
                  onClick={() => {
                    const firstElement = childRows[0];
                    const filters: BasicObject = {};
                    infoGrid.groupBy.forEach((keyGroupBy) => {
                      filters[keyGroupBy] = firstElement[keyGroupBy];
                    });

                    childRows.forEach((rowInfo: any) => {
                      infoGrid.groupBy.forEach((keyGroupBy) => {
                        if (filters[keyGroupBy] && filters[keyGroupBy] !== rowInfo[keyGroupBy]) {
                          delete filters[keyGroupBy];
                        }
                      });
                    });
                  }}
                >
                  {childRows.reduce((prev: number, value: BasicObject) => prev + value[key], 0)}
                </Button>);
            },
            name: key,
          }));

          setInfoGrid({ ...infoGrid, columns: columnsResponse, rows: response.data });
        }
      });
  }, []);

  return (
    <div className="flex">
      <div className="flex1">
        <Header title="Hammurabi" />
      </div>
      {/*<Toolbar>
        <Checkbox
          defaultChecked={!!(infoGrid.groupBy.includes('area'))}
          onChange={(checkbox) => {
            const value = checkbox.target.checked;
            let newGroupByList = infoGrid.groupBy;
            if (value) {
              newGroupByList.push('area');
            } else {
              newGroupByList = newGroupByList.filter((column) => column !== 'area');
            }
            setInfoGrid({ ...infoGrid, groupBy: newGroupByList });
          }}
        >
          Area
        </Checkbox>
      </Toolbar>*/}
      {rows && (
        <div className="flex1">
          <PivotGrid
            columns={columns}
            groupBy={groupBy}
            height={window.innerHeight - heights.header}
            rows={filteredRows}
          />
        </div>
      )}
    </div>
  );
}

export default Hammurabi;
