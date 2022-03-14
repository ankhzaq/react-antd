import React from 'react';
import Hammurabi from './screens/Hammurabi';
import { Route, Routes } from 'react-router-dom';
import ObjectsNoRules from './screens/ObjectsNoRules';
import { StateInspector } from 'reinspect';

function App() {
  return (
    <Routes>
      <Route path="/objectsNoRules" element={<ObjectsNoRules /> } />
      <Route path="/hammurabi" element={ <Hammurabi />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
}

export default App;
