import React, { useState } from 'react';

import Loading from './components/Loading/Loading';
import Login from "./components/Login/Login"
import Register from './components/Register/Register';
import Wrapper from './components/Wrapper/Wrapper';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import './App.css';
import AuthProvider from './context/auth-context';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import ForgotPassword from './components/ForgotPassword/ForgotPassowrd';
import ProductDetailsProvider from './context/product-context';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthProvider isLoading={isLoading} setIsLoading={setIsLoading}>
          <Wrapper>
            {isLoading && <Loading />}
            <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to={{ pathname: "/dashboard" }} />
            </Route>
            <Route exact path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route exact={true} path="/login">
              <Login />
            </Route>
            <Route exact={true} path="/register">
              <Register />
            </Route>
            <ProductDetailsProvider>
              <PrivateRoute path="/dashboard">
                  <Dashboard />
              </PrivateRoute>
            </ProductDetailsProvider>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>  


          </Wrapper>
      </AuthProvider>
      
  );
}

export default App;
