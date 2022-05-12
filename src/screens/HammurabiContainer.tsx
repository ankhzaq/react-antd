import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import DockLayout from 'rc-dock';
import Filters from 'components/Filters';
import moment from 'moment';
import Hammurabi from './Hammurabi';
import FooterFilter from 'components/Filters/FooterFilter';
import { connect, useSelector } from 'react-redux';
import { BasicObject, rootReducerInterface } from '../interfaces/common';
import { setFiltersAction } from '../store/actions/hammurabi';
import { FiltersPanelHammurabi } from '../interfaces/screens/hammurabi';

interface HammurabiContainerProps {
  saveFilters: (props: FiltersPanelHammurabi) => void;
}

let localFilterPanel: FiltersPanelHammurabi;

const filtersRef: BasicObject = {};

let formRef: any = null;

function HammurabiContainer(props: HammurabiContainerProps) {
  const { saveFilters } = props;

  const { hammurabi: { filtersPanel: { data } } } = useSelector((state: rootReducerInterface) => state);

  // initialize filters according value saved in redux
  useEffect(() => {
    localFilterPanel = JSON.parse(JSON.stringify(data));
  }, []);

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
                          defaultValue: data.executionDate ? moment(data.executionDate) : null,
                          element: "DatePicker",
                          format: "DD-MM-YYYY",
                          key: 'executionDate',
                          placeholder: 'Execution date',
                          ref: (refInput: any) => {
                            filtersRef.executionDate = refInput;
                          }
                        }
                        ,
                        {
                          defaultValue: data.cutoffDate ? moment(data.cutoffDate) : null,
                          element: "DatePicker",
                          format: "DD-MM-YYYY",
                          // format: "YYYY-MM-DD HH:mm:ss",
                          key: 'cutoffDate',
                          placeholder: 'Cutoff date',
                          ref: (refInput: any) => {
                            filtersRef.cutoffDate = refInput;
                          }
                          // showTime: { format: 'HH:mm:ss' }
                        },
                        {
                          defaultValue: data.uuaaId || null,
                          element: 'Input',
                          key: 'uuaaId',
                          placeholder: "Uuaa",
                          ref: (refInput: any) => {
                            filtersRef.uuaaId = refInput;
                          }
                        },
                        {
                          defaultValue: data.deploymentType || null,
                          element: "Select",
                          key: 'deploymentType',
                          options: [
                            {
                              label: 'LOCAL',
                              value: 'LOCAL'
                            },
                            {
                              label: 'GLOBAL',
                              value: 'GLOBAL'
                            },
                            {
                              label: 'MULTICOUNTRY',
                              value: 'MULTICOUNTRY'
                            },
                          ],
                          placeholder: 'Deployment type',
                          ref: (refInput: any) => {
                            filtersRef.deploymentType = refInput;
                          }
                        },
                        {
                          element: (
                            <FooterFilter
                              key="footerFilter"
                              onClearClick={() => {
                                formRef.resetFields();
                                const keysRefFilters = Object.keys(filtersRef);
                                keysRefFilters.forEach((keyRefFilter: string) => {
                                  const refFilter = filtersRef[keyRefFilter];
                                  if (refFilter.input) refFilter.input.value = null;
                                })
                                saveFilters({});
                              }}
                              onFilterClick={() => {
                                saveFilters(localFilterPanel);
                              }}
                            />
                          )
                        }
                      ]}
                      getFilters={(filter: FiltersPanelHammurabi) => {
                        localFilterPanel = filter;
                      }}
                      setFormRef={(refForm: any) => {
                        formRef = refForm;
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
            {id: 'hammurabi', title: 'hammurabi', content: <Hammurabi />}
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
  saveFilters: (props: FiltersPanelHammurabi) => {
    dispatch(setFiltersAction(props));
  }
});

export default connect(null, mapDispatchToProps)(HammurabiContainer);
