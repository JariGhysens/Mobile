import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { loginWithEmail, loginAnonymously } from '../store/meetupsService';

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const result = await loginWithEmail(email, password);
    alert(result.message);
  };

  const handleAnonymousLogin = async () => {
    const result = await loginAnonymously();
    alert(result.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Nog geen account? Registreer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAnonymousLogin}>
        <Text style={styles.buttonText}>Login Anoniem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 8 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16 },
});
