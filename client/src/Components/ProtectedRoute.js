import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const authed = localStorage.getItem("authenticated");
  console.log("this", authed);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        authed ? <Component {...props} /> : <h1>404</h1>
      }
    />
  );
}

export default ProtectedRoute;