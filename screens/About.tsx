import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../providers/AuthProvider';
import { globalStyles } from '../styles/globalStyles';

export const About = () => {
  const {user} = useUserContext();
 
  const logOut = () => {
    auth.signOut()
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={globalStyles.subTitle}>Naam:  </Text>
          <Text style={styles.text}> {user.displayName || 'Anonieme gebruiker'} </Text>
          <Text style={globalStyles.subTitle}>Email:  </Text>
          <Text style={styles.text}>{user.email || 'Anonieme gebruiker'}</Text>
        </>
      ) : (
        <Text style={styles.text}>Je bent anoniem ingelogd.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.buttonText}>Log uit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 16, textAlign: 'center', marginTop: 5,   },
  title: { fontSize: 18, textAlign: 'center', marginTop: 5 , fontWeight: 'bold'},
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8, width: '80%' },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10, width: '80%' },
  buttonText: { color: 'white', fontSize: 16 }
});

export default About;
