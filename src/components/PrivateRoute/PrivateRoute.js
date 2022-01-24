import React, { useContext } from 'react';
import Login from '../Login/Login';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../context/auth-context';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const PrivateRoute = props => {
  const { showLoading, isLoggedIn } = useContext(AuthContext);

  return (
    <>      
      {isLoggedIn && <Route path={props.path}>{props.children}</Route>}
      {!isLoggedIn && <Redirect to="/login" />}
    </>
  );
}

export default PrivateRoute;