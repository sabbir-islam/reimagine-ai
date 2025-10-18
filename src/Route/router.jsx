import React from 'react';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from '../App';
import Home from '../Pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
        {
            path: "/",
            Component: Home
        }
    ]
  },
]);

export default router;