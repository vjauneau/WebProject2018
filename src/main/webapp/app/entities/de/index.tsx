import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import De from './de';
import DeDetail from './de-detail';
import DeUpdate from './de-update';
import DeDeleteDialog from './de-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DeDetail} />
      <ErrorBoundaryRoute path={match.url} component={De} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DeDeleteDialog} />
  </>
);

export default Routes;
