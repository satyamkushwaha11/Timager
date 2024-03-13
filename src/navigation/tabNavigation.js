import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AlarmScreen from '../screens/AlarmScreen';
import StopwatchScreen from '../screens/StopwatchScreen';
import TimerScreen from '../screens/TimerScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={'stopwatch'}
      sceneContainerStyle={{
        backgroundColor: 'white',
        paddingTop: 0,
        marginTop: 0, // Remove any top margin
        marginBottom: 0, // Remove any bottom margin
      }}
      screenOptions={() => ({
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 100 : 80,
          paddingTop: 1,
          backgroundColor: 'white',
        },
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 16,
          fontFamily: 'ar-reg',
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#3A0C75',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontSize: 26, // Adjust font size as needed
            fontWeight: 'bold',
            
          },
        headerStyle: {
          shadowColor: '#3A0C75',
          height:70
        },
        // headerShown: false,
      })}>
      {/* <Tab.Screen
        name="Alarm"
        component={AlarmScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name={'alarm-outline'} size={28} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Stopwatch"
        component={StopwatchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name={'stopwatch'} size={25} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name={'timer-outline'} size={25} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default TabNavigation;
