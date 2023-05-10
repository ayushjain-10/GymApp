// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './store';
import RoutineScreen from './screens/RoutineScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import TrackScreen from './screens/TrackScreen';
import DayScreen from './screens/DayScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const TrackStack = createStackNavigator();

function TrackStackScreen() {
  return (
    <TrackStack.Navigator>
      <TrackStack.Screen name="Track" component={TrackScreen} />
      <TrackStack.Screen name="Day" component={DayScreen} />
    </TrackStack.Navigator>
  );
}




export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Routine" component={RoutineScreen} />
          <Tab.Screen name="Exercises" component={ExercisesScreen} />
          <Tab.Screen name="Track" component={TrackStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
