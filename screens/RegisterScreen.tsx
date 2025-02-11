import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';

interface RegisterScreenProps {
  navigation: any;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');


  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*\d).{7,}$/.test(password);
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      alert('Voer een geldig emailadres in (moet een @ en een . bevatten).');
      return;
    }

    if (!isValidPassword(password)) {
      alert('Wachtwoord moet minimaal 1 hoofdletter, 1 cijfer en langer dan 6 karakters zijn.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Wachtwoorden komen niet overeen!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, {
          displayName: displayName
        });
      }

      alert('Account aangemaakt!');
      navigation.navigate('Login');
    } catch (error) {
      alert('Er is iets misgegaan of de gebruiker bestaat al.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registreren</Text>
      
      <TextInput
        placeholder="Naam"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Wachtwoord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Bevestig wachtwoord"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registreren</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Terug naar login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 8
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});
