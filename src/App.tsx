import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DockLayout from 'rc-dock'
import "rc-dock/dist/rc-dock.css";
import { useWillMount } from './hooks';
import { initializeStore } from './helpers/sessionStorage';
import env from 'react-dotenv';
import { createServerFunc } from './helpers/mockServer';
import StringJsonCommentted from 'components/StringJsonCommentted';
import HammurabiContainer from './screens/HammurabiContainer';
import Drilldown from './screens/Drilldown';
import ObjectsNoRulesContainer from './screens/ObjectsNoRulesContainer';
import DrilldownContainer from './screens/DrilldownContainer';

const layoutDock: any = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'horizontal',
        children: [{
          mode: 'horizontal',
          children: [
            {
              tabs: [
                {id: 'hammurabi', title: 'hammurabi', content: <HammurabiContainer />},
                {id: 'drilldown', title: 'drilldown', content: <DrilldownContainer />},
                {id: 'objectsNoRules', title: 'objectsNoRules', content: <ObjectsNoRulesContainer />}
              ],
            },
          ]
        },
          ],
      }
    ]
  }
};

function App() {

  useWillMount(() => {
    initializeStore();
    if (env.MOCKS !== "false") createServerFunc();
  });

  return (
    <Routes>
      <Route path="/playground" element={<StringJsonCommentted /> } />
      <Route path="/objectsNoRules" element={<ObjectsNoRulesContainer /> } />
      <Route path="/" element={
        <DockLayout
          defaultLayout={layoutDock}
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            right: 10,
            bottom: 10,
          }}
        />} />
    </Routes>
  );
}

export default App;
