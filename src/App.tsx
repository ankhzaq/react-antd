import React, { useEffect, useRef, useState } from 'react';
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
import StringJsonCommentted from 'components/StringJsonCommentted';
import HammurabiContainer from './screens/HammurabiContainer';

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
                {id: 'objectsNoRules', title: 'objectsNoRules', content: <ObjectsNoRules />}
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

  const dockRef = useRef(null);

  useWillMount(() => {
    initializeStore();
    if (env.MOCKS !== "false") createServerFunc();
  });

  return (
    <Routes>
      <Route path="/playground" element={<StringJsonCommentted /> } />
      <Route path="/objectsNoRules" element={<ObjectsNoRules /> } />
      <Route path="/" element={
        <DockLayout
          ref={dockRef}
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
