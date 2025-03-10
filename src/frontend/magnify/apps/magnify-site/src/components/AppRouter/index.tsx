import { SimpleLayout, useTranslations } from '@openfun/magnify-components';
import * as React from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { getJitsiRoutes } from '../../utils/routes/jitsi';
import { getRoomsRoutes } from '../../utils/routes/rooms';
import { getRootRoute, RootPath } from '../../utils/routes/root';

import { getUsersRoutes } from '../../utils/routes/users';
import { RoomsListView } from '../../views/rooms/list';
import { DefaultProvider } from '../DefaultProvider';

export const AppRouter = () => {
  const intl = useTranslations();

  let routes: RouteObject[] = [
    {
      path: RootPath.HOME,
      element: (
        <DefaultProvider>
          <Outlet />
        </DefaultProvider>
      ),
      children: [
        {
          ...getRootRoute(intl, [
            { index: true, element: <Navigate to={RootPath.HOME} /> },
            { ...getRoomsRoutes(intl) },
            { ...getUsersRoutes(intl) },
          ]),
        },

        { ...getJitsiRoutes() },
        {
          index: true,
          element: (
            <SimpleLayout urlLogo={'/assets/logo-fun-mooc.svg'}>
              <RoomsListView />
            </SimpleLayout>
          ),
        },
        { path: '*', element: <Navigate to={RootPath.HOME} /> },
      ],
    },
  ];

  let router = createBrowserRouter(routes);

  // return <div>{'DSDSDS'}</div>;
  return <RouterProvider router={router} />;
};
