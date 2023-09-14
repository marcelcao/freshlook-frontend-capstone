import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
// import NavBarAuth from '../components/NavBarAuth';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return <Loading />;
  }

  if (user) {
    return (
      <>
        {/* <NavBarAuth /> */}
        <Component {...pageProps} />
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
