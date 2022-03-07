import React from 'react';
import { Capsule } from './Capsule';
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'antd';
import Toolbar from 'components/Toolbar';

export default {
  title: 'Capsule',
  component: Capsule,
};

export const Default = () => (
  <BrowserRouter>
    <Capsule label="default capsule" />
  </BrowserRouter>
);

export const Customized = () => (
  <BrowserRouter>
    <Toolbar>
      <Capsule label="capsule1" bgColor="black" color="white" />
      <Capsule label="capsule2" bgColor="#48a69b" color="white" />
      <Capsule label="capsule3" bgColor="#cb4b84" color="white" />
    </Toolbar>
  </BrowserRouter>
);
