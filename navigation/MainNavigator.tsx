import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import TabNavigator from './TabNavigator';
import { AuthStack } from './stack/AuthStack';
import { useUserContext } from '../providers/AuthProvider';

const MainNavigator: React.FC = () => {
  const { loading, user } = useUserContext();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
