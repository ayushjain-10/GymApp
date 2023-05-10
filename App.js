// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './store';
import RoutineScreen from './screens/RoutineScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import TrackScreen from './screens/TrackScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Routine" component={RoutineScreen} />
          <Tab.Screen name="Exercises" component={ExercisesScreen} />
          <Tab.Screen name="Track" component={TrackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
