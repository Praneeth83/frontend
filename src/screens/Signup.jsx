import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isValidEmail = (email)=>{
    const index = email.indexOf('@');
  if (index === -1 || email.indexOf('@', index + 1) !== -1) {
    return false;
  }
  const parts = email.split('@');
  const local = parts[0];
  const domain = parts[1];
  if (!local || !domain) {
    return false;
  }
  if (!domain.includes('.')) {
    return false;
  }
  if (domain.startsWith('.') || domain.endsWith('.')) {
    return false;
  }

  return true;
  }
  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in both email and password.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    try {
      const res = await axios.post('http://10.0.2.2:8080/signup', { email, password });
      Alert.alert('Success', 'Signup successful.');
      setEmail('');
      setPassword('');
      navigation.replace('Login');
    } catch (error) {
      if (error.response) {
        Alert.alert('Signup Failed', error.response.data.error || 'There was an error signing up. Please try again.');
      } else {
        Alert.alert('Signup Failed', 'There was an error signing up. Please try again.');
      }
    }
  };
  

  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignup} color="#673AB7" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to login"
          onPress={() => navigation.navigate('Login')}
          color="#2196F3"
        />
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f1f1f1',
    elevation: 10, 
    shadowColor: 'black', 
    
    shadowOpacity: 0.7,
    shadowRadius:1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    elevation: 2, 
    shadowColor: 'black', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Signup;
