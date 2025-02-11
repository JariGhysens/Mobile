import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import { AboutStackParams } from '../../types/Param'
import { globalStyles } from '../../styles/globalStyles'
import About from '../../screens/About'
import { Header } from '../../components/Header'

export const AboutStack = () => {
    const Stack = createStackNavigator<AboutStackParams>()

  return (
    <Stack.Navigator
  screenOptions={globalStyles.options as StackNavigationOptions}
>
  <Stack.Screen
    name="AboutStack"  
    component={About}
    options={{
      header: () => <Header title="About"></Header>,
    }}
  />
</Stack.Navigator>

  )
}

const styles = StyleSheet.create({})