import React from 'react';

import GraphicStorageZones from 'components/drilldown/GraphicStorageZones';
import GridStatusByObject from 'components/drilldown/GridStatusByObject';
import GridMetrics from 'components/drilldown/GridMetrics';
import DockLayout from 'rc-dock';

const layoutDock: any = {
  dockbox: {
    mode: 'vertical',
    children: [
      {
        mode: 'horizontal',
        children: [
          {
            mode: 'horizontal',
            children: [{
              mode: 'horizontal',
              children: [
                {
                  tabs: [
                    {id: 'graphicStorageZones', title: 'Storages Zones', content: <GraphicStorageZones />}
                  ],
                },
              ]
            },
            ],
          },
          {
            tabs: [
              {id: 'drilldownScreen', title: 'Status by Object', content: <GridStatusByObject />}
            ]
          }
        ]
      },
      {
        mode: 'horizontal',
        children: [{
          mode: 'horizontal',
          children: [
            {
              tabs: [
                {id: 'gridMetrics', title: 'Metrics', content: <GridMetrics />}
              ],
            },
          ]
        }]
      }
    ]
  }
};

function Drilldown() {
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

export default Drilldown;
