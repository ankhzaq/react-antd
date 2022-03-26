import React from 'react';
import Hammurabi from './screens/Hammurabi';
import { Route, Routes } from 'react-router-dom';
import ObjectsNoRules from './screens/ObjectsNoRules';
import DockLayout from 'rc-dock'
import "rc-dock/dist/rc-dock.css";
import Filters from 'components/Filters';
import moment from 'moment';
import { useWillMount } from './hooks';
import { initializeStore } from './helpers/sessionStorage';
import env from 'react-dotenv';
import { createServerFunc } from './helpers/mockServer';

function App() {

  useWillMount(() => {
    initializeStore();
    if (env.MOCKS !== "false") createServerFunc();
  });

  return (
    <Routes>
      <Route path="/objectsNoRules" element={<ObjectsNoRules /> } />
      <Route path="/" element={
        <DockLayout
          defaultLayout={{
            dockbox: {
              mode: 'horizontal',
              children: [
                {
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
                    {
                      size: 1000,
                      tabs: [
                        {id: 'hammurabi', title: 'PivotGrid', content: <Hammurabi />}
                      ]
                    }
                  ]
                }
              ]
            }
          }}
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            right: 10,
            bottom: 10,
          }}
        >
          <Hammurabi />
        </DockLayout>} />
    </Routes>
  );
}

export default App;
