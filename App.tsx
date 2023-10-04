import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './src/components/pages/SignInScreen';
import HomeScreen from './src/components/pages/HomeScreen';
import NowPlayingMoviesScreen from './src/components/pages/NowPlayingMoviesScreen';
import MovieDetailScreen from './src/components/pages/MovieDetailScreen';
import SimilarMoviesScreen from './src/components/pages/SimilarMoviesScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="SignInScreen">
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NowPlayingMoviesScreen"
          component={NowPlayingMoviesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieDetailScreen"
          component={MovieDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SimilarMoviesScreen"
          component={SimilarMoviesScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
