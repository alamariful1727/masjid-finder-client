import React from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/home';

const PublicRoute = (props: { component: any; path: string; exact: boolean }) => {
  return <Route path={props.path} exact={props.exact} render={() => <Layout Component={props.component} />} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact={true} path="/" component={Home} />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const NoMatch = () => {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

export default App;
