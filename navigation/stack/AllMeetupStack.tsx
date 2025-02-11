import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { globalStyles } from '../../styles/globalStyles';
import { AllMeetups } from '../../screens/AllMeetups';
import { Header } from '../../components/Header';
import { MeetupDetails } from '../../screens/MeetupDetails';
import { listenToMeetups } from '../../store/meetupsService';
import { Meetup } from '../../types/Meetup';
import { AllmeetupParams } from '../../types/Param';


export default function AllMeetupStack() {
  const [meetups, setMeetups] = useState<Meetup[]>([]);

  useEffect(() => {
    const unsubscribe = listenToMeetups(setMeetups);
    return () => unsubscribe();
  }, []);

  const favoritesAmount = meetups.filter((meetup) => meetup.favorite).length;

  const Stack = createStackNavigator<AllmeetupParams>();

  return (
    <Stack.Navigator
  screenOptions={globalStyles.options as StackNavigationOptions}
>
  <Stack.Screen
    name="AllMeetupsStack"  
    component={AllMeetups}
    options={{
      header: () => (
        <Header title="Basketmatchen-Okapi" heart={true} favoritesCount={favoritesAmount} />
      ),
    }}
  />
  <Stack.Screen
    name="MeetupDetails"
    component={MeetupDetails}
    options={{
      header: () => (
        <Header title="Meetup" ShowReturnButton={true} />
      ),
    }}
  />
</Stack.Navigator>

  );
}

const styles = StyleSheet.create({});
