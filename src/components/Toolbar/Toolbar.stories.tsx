import React from 'react';
import { Toolbar } from './Toolbar';
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'antd';

export default {
  title: 'Toolbar',
  component: Toolbar,
};

export const Default = () => (
  <BrowserRouter>
    <Toolbar />
  </BrowserRouter>
);

export const Children = () => (
  <BrowserRouter>
    <Toolbar>
      <Button>Button example</Button>
    </Toolbar>
  </BrowserRouter>
);
