import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import AllMeetupStack from './stack/AllMeetupStack';
import { AboutStack } from './stack/AboutStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName: string;
      if (route.name === 'AllMeetupsTab') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'AboutTab') {
        iconName = focused ? 'information-circle' : 'information-circle-outline';
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  })}
>
  <Tab.Screen 
    name="AllMeetupsTab" 
    component={AllMeetupStack} 
  />
  <Tab.Screen 
    name="AboutTab" 
    component={AboutStack} 
  />
</Tab.Navigator>


  );
}
