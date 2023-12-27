import React from "react";
import NotPermission from "../../NotPermission";

const withAuthorization = (Component) => {
  const AuthorizedComponent = (props) => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "false") {
      return <NotPermission />;
    }

    return <Component {...props} />;
  };

  return AuthorizedComponent;
};

export default withAuthorization;
