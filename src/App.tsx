import React from 'react';
import Hammurabi from './screens/Hammurabi';
import { Route, Routes } from 'react-router-dom';
import ObjectsNoRules from './screens/ObjectsNoRules';

function App() {
  return (
    <Routes>
      <Route path="/objectsNoRules" element={<ObjectsNoRules /> } />
      <Route path="/hammurabi" element={<Hammurabi /> } />
      <Route path="/" element={<App />} />
    </Routes>
  );
}

export default App;
