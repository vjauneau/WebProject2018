import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Jeu from './jeu';
import JeuDetail from './jeu-detail';
import JeuUpdate from './jeu-update';
import JeuDeleteDialog from './jeu-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JeuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JeuUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JeuDetail} />
      <ErrorBoundaryRoute path={match.url} component={Jeu} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={JeuDeleteDialog} />
  </>
);

export default Routes;
