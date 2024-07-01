import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

const SearchStackNavigation = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Search" 
      component={Search} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="MovieDetail" 
      component={MovieDetail} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

export default SearchStackNavigation;
