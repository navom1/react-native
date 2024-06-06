import { View, Text, Pressable } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import Colors from '@/app/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

import Events from '@/app/Components/EventSummary';


const Home = () => {
 // const { user } = useUser();
 const [role] = useState();

 //I guess this is how I have to do it?
 const[workerString, setWorkerString] = useState('');

  useEffect(() => {
    

    if(role == "MEDICAL") {
     setWorkerString("YOU ARE A MEDICAL WORKER");
    }
    
  });


  return (
    <SafeAreaView style={styles.container}>

      <span>  {workerString}  </span>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* <Categories />  */}
        <Text style={styles.header}>Your events</Text>
        <Events/>
        <Text style={styles.header}>Events near you</Text>
       
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    top: 50,
    backgroundColor: Colors.RMABG,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.RMABG,
  },
});

export default Home;
