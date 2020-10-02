import React from 'react'
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/" render={() => <div>
      Event Locator Client
    </div>} />
    <Route path="*">
            <NoMatch />
          </Route>
      </Switch>
    </BrowserRouter>
  )
}

const NoMatch = () => {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App

