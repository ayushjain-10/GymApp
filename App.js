import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './store';
import RoutineScreen from './screens/RoutineScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import TrackScreen from './screens/TrackScreen';
import DayScreen from './screens/DayScreen';
import { Ionicons } from 'react-native-vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const TrackStack = createStackNavigator();

function TrackStackScreen() {
  return (
    <TrackStack.Navigator>
      <TrackStack.Screen name=" " component={TrackScreen} />
      <TrackStack.Screen name="Track" component={DayScreen} />
    </TrackStack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Routine') {
                iconName = focused ? 'ios-list' : 'ios-list';
              } else if (route.name === 'Exercises') {
                iconName = focused ? 'ios-body' : 'ios-body-outline';
              } else if (route.name === 'Track') {
                iconName = focused ? 'ios-stopwatch' : 'ios-stopwatch-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Routine" component={RoutineScreen} />
          <Tab.Screen name="Exercises" component={ExercisesScreen} />
          <Tab.Screen name="Track" component={TrackStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
