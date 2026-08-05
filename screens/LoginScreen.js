import AuthContent from '../components/Auth/AuthContent';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/Ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/authContext';


function LoginScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCntxt = useContext(AuthContext);
  
  const loginHandler =  async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCntxt.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed', 
        'Could not logged in user. Please check your input and try again later.');
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Signing in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;