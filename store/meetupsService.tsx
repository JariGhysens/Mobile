import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signInAnonymously, signOut, User } from 'firebase/auth';
import { Meetup, NewMeetup } from '../types/Meetup';
import { Alert } from 'react-native';

const meetupsCollectionRef = collection(db, 'meetups');

export const getMeetups = async () => {
  try {
    const snapshot = await getDocs(meetupsCollectionRef);
    const meetups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { meetups };
  } catch (error) {
    console.error('Error fetching meetups:', error);
    return { meetups: [] };
  }
};
  
export const addMeetup = async (meetup: NewMeetup, user: User | null) => {
  try {
    if(user?.isAnonymous){
      throw new Error("Eens anonieme gebruiker kan geen meetups toevoegen");
    } 
      await addDoc(meetupsCollectionRef, meetup);
  }catch (error) {
    Alert.alert('Anonieme gebruiker kan geen meetups toevoegen')
  }
};

export const deleteMeetup = async (id) => {
  try {
    const meetupDoc = doc(db, 'meetups', id);
    await deleteDoc(meetupDoc);
  } catch (error) {
    console.error('Error deleting meetup: ', error);
  }
};


export const updateMeetup = async (id, updatedMeetup) => {
  try {
    const meetupDoc = doc(db, 'meetups', id);
    await updateDoc(meetupDoc, updatedMeetup);
  } catch (error) {
    console.error('Error updating meetup: ', error);
  }
};

export const listenToMeetups = (
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>> ) => {
const meetupsCollectionRef = collection(db, 'meetups');
return onSnapshot(meetupsCollectionRef, (snapshot) =>
{
  const meeutps = snapshot.docs.map((doc) => {
    return {...(doc.data() as Meetup), firebaseID: doc.id};
  });
  setMeetups(meeutps);
});
  };


export const loginWithEmail = async (email : string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, message: 'Succesvol ingelogd!' };
  } catch (error) {
    return { success: false,};
  }
};


export const loginAnonymously = async () => {
  try {
    await signInAnonymously(auth);
    return { success: true, message: 'Anoniem ingelogd!' };
  } catch (error) {
    return { success: false,};
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true, message: 'Succesvol uitgelogd!' };
  } catch (error) {
    return { success: false,};
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const isUserAnonymous = () => {
  const user = auth.currentUser;
  return user?.isAnonymous || false;
};

