import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Home from './components/Home/Home';
import OverView from './components/Overview/Overview';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/LoginForm/RegisterForm';
import { RootStackParamList } from './Types';
import { storeModel } from './store';
import { StoreProvider } from 'easy-peasy';

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <StoreProvider store={storeModel}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Register" component={RegisterForm} />
          <Stack.Screen
            name="Overview"
            component={OverView}
            options={{ headerLeft: undefined }}
          />
        </Stack.Navigator>
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
