/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Routes from '../routes/index';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {

  constructor(props){
    super(props);


  }

  render() {

    let style = {
      container: {
        'marginLeft': '0',
        'transition': 'all 0.26s'
      }
    };

    return (
      /* SideNav Layout - Removed
       * Change layout here if require
       * */
      <MuiThemeProvider>
        <Router>
          <div>

            <div style={style.container}>

              {Routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}

            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
