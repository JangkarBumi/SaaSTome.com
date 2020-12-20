import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(selectUser);

  console.log(user ? 'logout' : 'login');
  console.log(user.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        return user.user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
