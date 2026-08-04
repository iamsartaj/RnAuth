import AuthContent from '../components/Auth/AuthContent';
import { useState } from 'react';
import LoadingOverlay from '../components/Ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';


function LoginScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loginHandler =  async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      await login(email, password);
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