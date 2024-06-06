
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import {  useAuth } from '@/app/context/AuthContext';
import { Tabs } from 'expo-router';


export const LogoutButton = () => {
  const { authState, onLogout} = useAuth();



  return (
    <Pressable onPress={onLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={'#fff'} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { authState } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#eee5ff',
        },
        headerTintColor: '#fff',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarLabel: 'Home',
        }}
        
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'My Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          tabBarLabel: 'My Profile',
          headerRight: () => <LogoutButton />,
        }}
        
      />
    </Tabs>
  );
};

export default TabsPage;
