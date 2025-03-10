import React from 'react';
import { IntlShape } from 'react-intl';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { UserPreference } from '../../../views/users/preferences';

export enum UserPath {
  ROOT = '/app/users',
  PREFERENCES = '/app/users/preferences',
}

export const getUsersRoutes = (intl: IntlShape): RouteObject => {
  return {
    path: UserPath.ROOT,
    element: <Outlet />,
    children: [
      { element: <Navigate to={UserPath.PREFERENCES} />, index: true },
      {
        element: <UserPreference />,
        path: UserPath.PREFERENCES,
      },
    ],
  };
};
