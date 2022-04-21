import React from 'react';
import 'antd/dist/antd.css';
import DockLayout from 'rc-dock';
import Filters from 'components/Filters';
import moment from 'moment';
import Drilldown from './Drilldown';

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
                        element: 'Input',
                        key: 'input',
                        placeholder: "Basic usage"
                      },
                      {
                        element: "Select",
                        key: 'select',
                        options: [{
                          label: 'label1',
                          value: 'value1'
                        },
                          {
                            label: 'label2',
                            value: 'value2'
                          }],
                      },
                      {
                        element: "DatePicker",
                        format: "DD-MM-YYYY",
                        key: 'date',
                        defaultValue: moment()
                      }
                      ,
                      {
                        element: "DatePicker",
                        format: "YYYY-MM-DD HH:mm:ss",
                        key: 'datetime',
                        showTime: { format: 'HH:mm:ss' }
                      }
                    ]}
                    getFilters={(filter) => {
                      console.log("filter: ", filter);
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
          {id: 'drilldownScreen', title: 'Data', content: <Drilldown />}
        ]
      }
    ]
  }
};

function DrilldownContainer(props: any) {

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

export default DrilldownContainer;
