import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const NewMeetup = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.cancelButtonWrapper}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
         <Text style={styles.cancelButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  input: { padding: 10, borderWidth: 1, borderColor: '#ccc', marginHorizontal: 10 },
  inputError: { borderColor: 'red' },
  buttonToevoegen: { backgroundColor: '#007bff', padding: 5, alignItems: 'center', borderRadius: 5, margin: 10 , marginTop: 30 },
  buttonText: { color: 'white' },
  errorText: { color: 'red', marginLeft: 10 },
  dateText: { marginLeft: 10, fontSize: 16 },
  pickerButton: { backgroundColor: '#007bff', padding: 5, borderRadius: 5, alignItems: 'center', margin: 10 },
  pickerButtonText: { color: 'white', fontSize: 16 },
  cancelButtonWrapper: { alignItems: 'center', marginBottom: 20 },
  cancelButton: { backgroundColor: '#ff4d4d', padding: 10, borderRadius: 20 },
  cancelButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default NewMeetup;
