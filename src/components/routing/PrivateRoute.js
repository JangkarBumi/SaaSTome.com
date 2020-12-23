import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import Spinner from '../Spinner';

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.loading ? (
          <Spinner />
        ) : user.user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
}
