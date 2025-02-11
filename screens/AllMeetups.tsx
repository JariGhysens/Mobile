import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Text, Modal, Alert } from 'react-native';
import { addMeetup, deleteMeetup, listenToMeetups, updateMeetup } from '../store/meetupsService';
import { useNavigation } from '@react-navigation/native';
import { Meetup, NewMeetup } from '../types/Meetup';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '../providers/AuthProvider';
import { AddMeetup } from '../forms/AddMeetup';
import { globalStyles } from '../styles/globalStyles';
import Card from '../components/Card';
import { AllmeetupParams } from '../types/Param';
import { StackNavigationProp } from '@react-navigation/stack';

export type AllMeetupNavigation = StackNavigationProp<
  AllmeetupParams,
  'AllMeetups'
  >

export const AllMeetups = () => {
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [modalOpen, setOpenModal] = useState<boolean>(false);
  const {user} = useUserContext();
   const navigation = useNavigation<AllMeetupNavigation>();
  useEffect(() => {
    const unsubscribe = listenToMeetups(setMeetups);
    return () => unsubscribe();
  }, []);

  const handleToggleFavorite = async (id, currentFavoriteStatus) => {
    if(!user?.isAnonymous)
    {
      await updateMeetup(id, { favorite: !currentFavoriteStatus });
    }
    else {
      alert('Als anonieme gebruiker mag je geen meetups favoriten');
    }
  };
  


  const handleDeleteMeetup = async (id) => {
    if(!user?.isAnonymous)
      {
    await deleteMeetup(id);
  }
  else {
    alert('Als anonieme gebruiker mag je geen meetups verwijderen');
  }
  };
  

  const handleAddMeetup = async (newMeetup : NewMeetup) => {
    
     try {
      const meetup: Meetup = {
        ...newMeetup, 
      };
      await addMeetup(meetup, user);
      setOpenModal(false);
     }
     catch (error) {
      console.error('Error adding meetup (allmeetups):', error);
   };
  }
  
  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <Card>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MeetupDetails', {title: item.title,address: item.address,description: item.description, favorite: item.favorite})}
            >
              <Ionicons name="information-circle-outline" size={24} color="blue" />
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => handleToggleFavorite(item.firebaseID, item.favorite)}>
              <Ionicons
                name={item.favorite ? 'heart' : 'heart-outline'}
                size={24}
                color={item.favorite ? 'red' : 'gray'}
              />
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => handleDeleteMeetup(item.firebaseID)}>
              <Ionicons name="trash-outline" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
 <Modal visible={modalOpen}animationType= "slide">
      <View style={styles.modalContainer}>
            <View style={styles.cancelButtonWrapper}>
              <TouchableOpacity style={styles.cancelButton} >
              <Text style={styles.cancelButtonText} onPress={() => setOpenModal(false)}>X</Text>
              </TouchableOpacity>
              <AddMeetup onSubmit={handleAddMeetup}/>
            </View>
          </View>
      </Modal>
      <View style={styles.container}>
      <FlatList
        data={meetups}
        numColumns={2}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
      />     
    </View>
    {!user?.isAnonymous && (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={() => setOpenModal(true)}>
          <Ionicons name="add-circle" size={60} color="grey" />
        </TouchableOpacity>
    </View>
    )}
    {user?.isAnonymous && (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => alert('Als anonieme gebruiker mag je geen meetups toevoegen')}
    >
      <Ionicons name="add-circle" size={60} color="grey" />
    </TouchableOpacity>
  </View>
)}

    </View>
  );
};


const styles = StyleSheet.create({
  modalContainer: {flex: 1, width: "100%"}, 
  container: { flex: 1, backgroundColor: 'lightgrey' },
  cardContainer: { flex: 1, padding: 10 },
  addButton: { position: 'absolute', bottom: 30, alignSelf: 'center' },
  cancelButtonWrapper: { alignItems: 'center', marginBottom: 20 },
  cancelButton: { backgroundColor: '#ff4d4d', padding: 10, borderRadius: 20 },
  cancelButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  title: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  iconContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
});


