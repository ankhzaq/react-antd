import React, { useEffect, useMemo } from 'react';
import { connect, useSelector } from 'react-redux'
import { useState } from 'reinspect';
import Header from "components/Header";
import PivotGrid from 'components/PivotGrid';
import { COLORS, heights } from '../helpers/consts';
import { PivotGridProps } from 'components/PivotGrid/PivotGrid';
import { Button, Checkbox, InputNumber, Layout, Select, Skeleton, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { BasicObject } from '../interfaces/common';
import { getSessionStorage, setSessionStorage } from '../helpers/sessionStorage';
import Toolbar from 'components/Toolbar';
import ModalComponent, { ModalInfoInterface } from 'components/Modal/ModalComponent';
import Graphics from 'components/Hammurabi/Graphics';
import GraphicsRules from 'components/Hammurabi/GraphicsRules';
import hammurabi from '../store/sagas/hammurabi';
import Capsule from 'components/Capsule';
import { getHammurabiDataAction } from '../store/actions/hammurabi';
const { Content } = Layout;

const { Option } = Select;

const GROUP_BY_COLUMNS = ['countryId', 'area', 'storageZoneType'];

const defaultInfoGrid: PivotGridProps = {
  rows: [],
  columns: [],
  groupBy: GROUP_BY_COLUMNS
};

interface Filter {
  area: string[];
  country: string[];
  storageZone: string[];
}

const initialModalInfo: ModalInfoInterface = {};

interface interfaceRulesInfo {
  list: string[];
  mvp: string[];
};

const rulesInfo: interfaceRulesInfo = {
  list: [],
  mvp: []
};

function Hammurabi(props: any) {

  const { common, hammurabi } = useSelector((state: any) => state);
  const { grid: { data, loading }, filtersPanel: { data: dataFilterPanel, date: dateFilterPanel } } = hammurabi;

  useEffect(() => {
    console.log("Loading hammurabi: ", loading);
  }, [loading]);


  const { addTab, getData } = props;

  const [modalInfo] = useState(initialModalInfo, "modalInfo");

  const [infoGrid, setInfoGrid] = useState(defaultInfoGrid, "infoGrid");
  const [filters, setFilters] = useState<Filter>(hammurabi.filters, "filterGrid");
  const [showGraphics, setShowGraphics] = useState(false, 'hammurabiGraphic');
  const localFilters: BasicObject = { ...filters };

  if (!rulesInfo.list.length && common.rules.data.length) {
    common.rules.data.forEach((ruleKey: any) => {
      const { ruleMvpType, ruleType, principleType } = ruleKey;
      const ruleFullKey = `${principleType}.${ruleType}`;
      if (ruleMvpType) rulesInfo.mvp.push(ruleFullKey);
      rulesInfo.list.push(ruleFullKey);
    });
  }

  // SHOW MODAL
  useEffect(() => {
    getData(dataFilterPanel);
  }, [dateFilterPanel]);

  const { rows, columns, groupBy } = infoGrid;

  const setNewFilters = (newFilters: any) => {
    hammurabi.filters = newFilters;
    setSessionStorage("hammurabi", hammurabi);
    setFilters(newFilters);
  }

  const filteredRows = useMemo(() => {
    const currentFilters: BasicObject = filters;
    return infoGrid.rows.filter((r) => {
      const validRecord = columns.every(({ key }) => {
        const valueFilter: any = currentFilters[key];
        const valueColumn = r[key];
        if (Array.isArray(valueFilter)) {
          if (!valueFilter.length || valueFilter.includes(valueColumn)) return true;
          return false
        } else {
          if ((!valueFilter || valueFilter.min || valueFilter.min <= valueColumn) && (!valueFilter || !valueFilter.max || valueFilter.max >= valueColumn)) {
            return true;
          }
          return false
        }
        return false;
      });
      return validRecord;
    });
  }, [infoGrid.rows, filters]);

  useEffect(() => {
    if (data && data.data) {
      const rows = data.data;
      const firstElement = rows[0];
      // dispatch({ type: 'hammurabi_grid_succeeded', payload: { data: { data: rows, pagination: response.pagination } }, screen: SCREEN, elements: ELEMENTS});
      if (firstElement) {
        const columns = Object.keys(firstElement).filter((key) => key !== 'objectsInMultipleJobsCount' && (key.includes('Count') || infoGrid.groupBy.includes(key) || key === 'rulesDesc'));
        const columnsResponse = columns.map((key: string) => ({
          headerCellClass: 'filter-cell',
          headerRenderer: (info: any) => {
            const { column: { name } } = info;
            const currentFilters: BasicObject = getSessionStorage("hammurabi");

            if (name === 'rulesDesc') {
              return (
                <div>
                  <div>{key}</div>
                  <Select
                    defaultValue={localFilters[key]}
                    mode="multiple"
                    onChange={(value) => {
                      const newFilters = { ...filters };
                      localFilters[key] = value;
                      setNewFilters(newFilters);
                    }}
                    placeholder={`${key} filter...`}
                    style={{ width: '100%' }}
                  >
                    {rulesInfo.list.map((option) => (
                      <Option key={`${key}-${option}`} value={option}>{option}</Option>
                    ))}
                  </Select>
                </div>
              );
            }

            if (!infoGrid.groupBy.includes(name))
              return (
                <>
                  <div className="flex1">{name}</div>
                  <div className="flex">
                    <InputNumber
                      className="flex1"
                      defaultValue={currentFilters[key] && currentFilters[key].min}
                      onChange={(value) => {
                        if (!currentFilters[key]) {
                          currentFilters[key] = {
                            min: 0,
                            max: 0
                          };
                        }
                        currentFilters[key].min = value;
                        setNewFilters(currentFilters);
                      }}
                      placeholder="min"
                    />
                    <InputNumber
                      className="flex1"
                      defaultValue={currentFilters[key] && currentFilters[key].max}
                      onChange={(value) => {
                        if (!currentFilters[key]) {
                          currentFilters[key] = {
                            min: 0,
                            max: 0
                          };
                        }
                        currentFilters[key].max = value;
                        setNewFilters(currentFilters);
                      }}
                      placeholder="max"
                    />
                  </div>
                </>
              );
            const options: string[] = [];
            rows.forEach((rowInfo: any) => {
              const value = rowInfo[key];
              const alreadyExist = value && options.includes(value);
              if (value && !alreadyExist) options.push(value);
            });

            const filtersSession = getSessionStorage("hammurabi").filters;

            return (
              <>
                <div>{key}</div>
                <Select
                  defaultValue={filtersSession && filtersSession[key]}
                  mode="multiple"
                  onChange={(value) => {
                    const newFilters = { ...filtersSession };
                    newFilters[key] = value;
                    setNewFilters(newFilters);
                  }}
                  placeholder={`${key} filter...`}
                  style={{ width: '100%' }}
                >
                  {options.map((option) => (
                    <Option key={`${key}-${option}`} value={option}>{option}</Option>
                  ))}
                </Select>
              </>
            );
          },
          key,
          groupFormatter: function (props: any) {
            const { childRows, groupKey } = props;

            if (key === 'rulesDesc') {
              const allRules: any[] = [];

              // get all rules of every row
              childRows.forEach((row: any) => {
                row.rulesDesc.forEach((rule: string) => {
                  if (!allRules.includes(rule)) allRules.push(rule);
                });
              });

              let tooltipRules = '';

              // tooltip to show all rules list
              allRules.forEach((ruleKey) => {
                if (tooltipRules.length) tooltipRules += ', ';
                tooltipRules += ruleKey;
              });

              return (
                <Tooltip title={tooltipRules}>
                  <div className="flex-row height100">
                    {allRules.map((ruleKey) => {
                      const isMVPRule = rulesInfo.mvp.includes(ruleKey);
                      const bgColor = isMVPRule ? COLORS.GREEN : COLORS.YELLOW;
                      return (
                        <Capsule bgColor={bgColor} color="white" label={ruleKey} key={ruleKey} />
                      );
                    })}
                  </div>
                </Tooltip>
              );
            }

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
                  addTab("objectsNoRules");
                }}
              >
                {childRows.reduce((prev: number, value: BasicObject) => prev + value[key], 0)}
              </Button>);
          },
          name: key,
        }));

        setInfoGrid({ ...infoGrid, columns: columnsResponse, rows: data.data });
      }
    }
  }, [data]);

  return (
    <Layout className="site-layout-background width100 height100">
      <ModalComponent {...modalInfo} />
      <Content>
        <div className="flex-column">
          <Header title="Hammurabi Jobs" />
          {showGraphics ? (
            <>
              <Toolbar>
                <Button
                  onClick={() => {
                    setShowGraphics(false);
                  }}
                >
                  Show Table
                </Button>
              </Toolbar>
              <Skeleton loading={loading}>
                <Graphics />
                <GraphicsRules />
              </Skeleton>
            </>
          ) : (
            <>
              <Toolbar>
                {GROUP_BY_COLUMNS.map((key) => (
                  <Checkbox
                    defaultChecked={!!infoGrid.groupBy.includes(key)}
                    key={key}
                    onChange={(checkbox) => {
                      const value = checkbox.target.checked;
                      let newGroupByList: string[] = JSON.parse(JSON.stringify(infoGrid.groupBy));
                      if (value) {
                        newGroupByList.push(key);
                      } else {
                        newGroupByList = newGroupByList.filter((column: string) => column !== key);
                      }
                      setInfoGrid({ ...infoGrid, groupBy: newGroupByList });
                    }}
                  >
                    {key}
                  </Checkbox>
                ))}
                <Button
                  onClick={() => {
                    setShowGraphics(true);
                  }}
                >
                  Show Hammurabi Graphics
                </Button>
              </Toolbar>
              {rows && (
                <div className="flex1">
                  <Skeleton loading={loading}>
                    <PivotGrid
                      columns={columns}
                      groupBy={groupBy}
                      height={window.innerHeight - heights.header - heights.toolbar}
                      rows={filteredRows}
                      restProps={{
                        headerRowHeight: 75
                      }}
                    />
                  </Skeleton>
                </div>
              )}
            </>
          )}
        </div>
      </Content>
    </Layout>
  );
}
const mapDispatchToProps = (dispatch: any) => ({
  getData: (payload: any) => dispatch(getHammurabiDataAction(payload))
});

export default connect(null, mapDispatchToProps)(Hammurabi);
