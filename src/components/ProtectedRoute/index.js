// import {Redirect, Route} from 'react-router-dom'
// import Cookies from 'js-cookie'

// const ProtectedRoute = props => {
//   const token = Cookies.get('jwt_token')
//   if (token === undefined) {
//     return <Redirect to="/login" />
//   }
//   return <Route {...props} />
// }

// export default ProtectedRoute


import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get('jwt_token');

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
