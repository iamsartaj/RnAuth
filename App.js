import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/authContext';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/Ui/IconButton';
import LoadingOverlay from './components/Ui/LoadingOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: Colors.primary500 },
  headerTintColor: 'white',
  contentStyle: { backgroundColor: Colors.primary100 },
};

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCntxt = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: () => (
            <IconButton
              icon="exit"
              size={24}
              color="white"
              onPress={authCntxt.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCntxt = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authCntxt.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCntxt = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          authCntxt.authenticate(token);
        }
      } catch (error) {
        console.warn('Failed to restore auth token', error);
      } finally {
        setIsTryingLogin(false);
      }
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay message="Loading..." />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Status bar stays separate (white). App UI starts below it. */}
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
        <StatusBar style="dark" />
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}