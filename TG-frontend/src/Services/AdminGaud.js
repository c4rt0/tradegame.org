import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./../Store/selectors/authSelector";
import { isAdminRole } from "./../Store/selectors/roleSelector";

export function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAdminRole() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
