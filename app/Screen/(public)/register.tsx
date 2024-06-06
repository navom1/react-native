import { Button, TextInput, View, StyleSheet } from 'react-native';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';

const Register = () => {
 

 


  //const { isLoaded, signUp, setActive } = useSignUp();
  const [name, setName] = useState(''); 
  const [username, setEmail] = useState(''); 
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    const { onRegister } = useAuth();    

    onRegister!(name, username, emailAddress, password ); 
   };

  // Verify the email address
  const onPressVerify = async () => {

  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <TextInput ref="name" autoCapitalize="none" placeholder="Full Name" value={name}  style={styles.inputField} />
          <TextInput ref="username" placeholder="user name" value={username}  style={styles.inputField} />
          <TextInput ref="emailAddress" autoCapitalize="none" placeholder="" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
          <TextInput ref="password" placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

          <Button onPress={onSignUpPress} title="Sign up" color={'#6c47ff'}></Button>
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput value={code} placeholder="Code..." style={styles.inputField} onChangeText={setCode} />
          </View>
          <Button onPress={onPressVerify} title="Verify Email" color={'#6c47ff'}></Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default Register;
