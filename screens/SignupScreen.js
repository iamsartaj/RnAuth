import AuthContent from '../components/Auth/AuthContent';
import { addUser } from '../util/auth';
import LoadingOverlay from '../components/Ui/LoadingOverlay';
import { useContext, useState } from 'react';
import { AuthContext } from '../store/authContext';
import { Alert } from 'react-native';


function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCntxt = useContext(AuthContext);

  const signupHandler =  async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await addUser(email, password);
      authCntxt.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed', 'Could not create user. Please check your input and try again later.');
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Signing up..." />;
  }

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;