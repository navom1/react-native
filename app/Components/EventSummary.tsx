import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { events } from '@/app/assets/data/events.';
import { Link } from 'expo-router';
import Colors from '../constants/Colors';

const  Events = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}>
      { events.map((event, index) => (
        <Link href={'(auth)/(events)/event'} key={index} asChild>
          <TouchableOpacity>
            <View style={styles.categoryCard}>
              <Image source={ event.img} style={styles.image} />
              <View style={styles.categoryBox}>
                <Text style={styles.categoryText}>{ event.name}</Text>
                <Text style={{ color: Colors.green }}>
                  { event.city} { event.state}
                </Text>
                <Text style={{ color: Colors.medium }}>(click for details)</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    backgroundColor: '#eee5ff',
    marginEnd: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
});

export default  Events;
