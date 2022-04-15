import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./../Store/selectors/authSelector";

export function UserRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
