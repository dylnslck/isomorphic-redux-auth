import { App, Login, Dashboard } from 'scenes';
import store from 'state/store';
import requiresAuth from './requiresAuth';
import checkAuth from './checkAuth';

const routes = {
  path: '/',
  component: App,
  onEnter: checkAuth(store()),
  indexRoute: { component: Login },
  childRoutes: [{
    path: '/dashboard',
    component: requiresAuth(Dashboard),
  }],
};

export default routes;
