import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import AuthService from '@/app/api/AuthService';
import AuthResponse from '@/app/entities/AuthResponse';
import { Link, useNavigation, useRouter } from "expo-router";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (name: string, username: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string ) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = '';

//get the API URL and Port from the environment variables file.
export const API_URL =  process.env.API_URL + ":" + process.env.API_PORT ;

const authService = new AuthService();

const AuthContext = createContext<AuthProps>({});

// Easy access to our Provider
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      // Load token on startup
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        // Set our HTTP Headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Set our context state
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const [role, setRole] = useState('');
      const [isWorker, setWorker] = useState(false);

      const router = useRouter();
      const navigation = useNavigation();

   
      //call the service whcih returns the data  
      //let result : AuthResponse;
      const result = await  authService.login(email, password )
      
    
     
      // Set our context state
      setAuthState({
        token: result.token!,
        authenticated: true,
      });

      // Set our HTTP Headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;

      // Write the JWT to our secure storage
      await SecureStore.setItemAsync(TOKEN_KEY, result.token!);

      //if the user has not accepted terms & conditions,
      //then send them to that page 
      if(!result.acceptedTAC){

      }

     

      //if they are a worker
      if(result.isWorker){
          //set the state flag to true
          setWorker(result.isWorker);

          //check to see if they already have a role
          //nd a desig
          if(result.role ){
               //if they do send them to the map

          }

          //Navigate to the worker page 
      
          router.replace('/(auth)/(events)/workerEvent');
        }



      //if they haven't been routed anywhere,
      return result;
        

    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const register = async (name: string, username: string, email: string, password: string) => {
    try {
      //return await axios.post(`${API_URL}/users`, { email, password });
      await authService.register(name, username, email, password);
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // Update HTTP Headers
    axios.defaults.headers.common['Authorization'] = '';

    // Reset auth state
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
