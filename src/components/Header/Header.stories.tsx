import React from 'react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Header',
  component: Header,
};

export const Default = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

export const Title = () => (
  <BrowserRouter>
    <Header title="Title header" />
  </BrowserRouter>
);

export const Back = () => (
  <BrowserRouter>
    <Header back />
  </BrowserRouter>
);

export const BackParent = () => (
  <BrowserRouter>
    <Header back="/parentScreen" />
  </BrowserRouter>
);
