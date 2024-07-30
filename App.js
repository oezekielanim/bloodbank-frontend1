import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomePage from './screens/HomePage';
import SignUpPage from './screens/SignUpPage';
import DonatePage from './screens/DonatePage';
import RequestPage from './screens/RequestPage';
import ChatPage from './screens/ChatPage';
import MapPage from './screens/MapPage';
import ProfilePage from './screens/ProfilePage';
import { UserContextProvider } from './config/userContext';
import EditProfilePage from './screens/EditProfilePage.js';
import './config/firebase.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="HomePage" component={HomePage} options={{  title : '',
          headerShown: false,
          headerTitleStyle: {
            color: 'red',
          }}}/>
        <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown:false}}/>
        <Stack.Screen name="ChatPage" component={ChatPage} options={{ title:'',}}/>
        <Stack.Screen name="MapPage" component={MapPage} options={{title:'',}}/>
        <Stack.Screen name="EditProfilePage" component={EditProfilePage} options={{ headerShown:false}}/>
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown:false}}/>
        <Stack.Screen name="DonatePage" component={DonatePage} options={{  title : '', }}/>
        <Stack.Screen name="RequestPage" component={RequestPage} options={{title : '', }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </UserContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
