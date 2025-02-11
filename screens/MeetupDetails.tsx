import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card'
import { StackNavigationProp } from '@react-navigation/stack';
import { AllmeetupParams } from '../types/Param';
import { RouteProp } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';


type MeetupDetailScreenNavigationProp = StackNavigationProp<
  AllmeetupParams,
  'MeetupDetails'
>;

type MeetupDetailsRouteProp = RouteProp<AllmeetupParams, 'MeetupDetails'>;

type MeetupDetailsProps = {
  navigation: MeetupDetailScreenNavigationProp;
  route: MeetupDetailsRouteProp;
};



export const MeetupDetails = ({ route }: MeetupDetailsProps) => {
  const { title, address , description} = route.params;

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.sort}>Titel</Text>
        <Text style={globalStyles.subTitle}>{title}</Text>
        <Text style={styles.sort}>Adres</Text>
        <Text>{address}</Text>
        <Text style={styles.sort}>Beschrijving</Text>
        <Text>{description}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  sort: {
    color: 'blue', 
    fontSize: 24, 
    fontWeight: 'bold'
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
});
