import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { AppRoutes } from './app.routes';
import { SignIn } from '../pages/SignIn';
import { Loading } from '../components/Loading';

export function Router() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(response => setUser(response));
    setLoading(false);

    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
