import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import NotFound from '../../components/not-found';
import AddEditPage from './pages/add-edit-page';
import MainPage from './pages/main-page';

const Photo = props => {
  const match = useRouteMatch();
  console.log(match);
  return (
    <Switch>
      <Route exact path={match.url} component={MainPage}/>
      <Route path={`${match.url}/add`} component={AddEditPage}/>
      <Route path={`${match.url}/:photoId`} component={AddEditPage}/>
      <Route component={NotFound}/>
    </Switch>
  )
}

export default Photo;
