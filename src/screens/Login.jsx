import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, SafeAreaView } from 'react-native';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email.trim()===''|| password.trim()===''){ Alert.alert('Invalid', 'Please fill all fileds'); return }
    try {
      const res = await axios.post('http://10.0.2.2:8080/login', {
        email: email,
        password: password,
      });
      if (res.data.token) {
        setEmail('');
        setPassword('');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }
    } catch (error) {
     
      Alert.alert("User not found (or) Invalid credentials", 'Please check your email and password');
    }
  };

  return (
   
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        <Button title="Login" onPress={handleLogin} color="#4CAF50" />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Go to Signup"
          onPress={() => navigation.navigate('Signup')}
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

export default Login;
