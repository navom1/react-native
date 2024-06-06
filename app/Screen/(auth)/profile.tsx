import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';


const Profile = () => {
  const  user  ="";
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const onSaveUser = async () => {
  
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>
        
      </Text>

      <TextInput placeholder="First Name" value={firstName}  style={styles.inputField} />
      <TextInput placeholder="Last Name" value={lastName}  style={styles.inputField} />
      <Button onPress={onSaveUser} title="Update account" color={'#6c47ff'}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
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
});

export default Profile;
