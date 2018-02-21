/*
 * Example Routes
 * */

import React from 'react';

import HomePage from './../containers/HomePage';
import NotFoundPage from './../containers/NotFoundPage';

let routes = [
  {
    path: '/',
    exact: true,
    component: ()=><HomePage/>
  },
  { path: '/notfound',
    exact: true,
    component: ()=><NotFoundPage/>
  }
];

export default routes;
