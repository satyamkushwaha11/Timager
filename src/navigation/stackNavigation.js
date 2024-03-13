import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import StopwatchScreen from '../screens/StopwatchScreen';
// Import other screen components if needed

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3A0C75', // Customize header background color
        },
        headerTintColor: 'white', // Customize header text color
        headerTitleAlign: 'center',

        headerTitleStyle: {
          fontSize: 26, // Customize header title font size
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Stopwatch"
        component={StopwatchScreen}
        options={{
          headerTitle: 'Stopwatch', // Customize header title
        }}
      />
      {/* Add other screens to the stack if needed */}
    </Stack.Navigator>
  );

};

export default StackNavigation;
