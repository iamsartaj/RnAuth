import AuthContent from '../components/Auth/AuthContent';
import { addUser } from '../util/auth';
import LoadingOverlay from '../components/Ui/LoadingOverlay';


function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signupHandler =  async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      await addUser(email, password);
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