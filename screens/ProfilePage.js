import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Button,handleLogout, Text,TouchableOpacity, Image,TextInput,StyleSheet,Alert,Pressable, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


const ProfilePage = () => {
    const navigation = useNavigation();
    const userData = {
        fullName: '',
        email: '',
        bloodGroup: '',
        phoneNumber: '',
        location: '',
      };
    
      const handleLogout = () => {
        // Handle logout action
        console.log('Logout');
        navigation.navigate('LoginScreen');
      };
    
      return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <View >
          <Text style={styles.header}>Profile
          </Text>
          <Image source={require('../assets/logo.png')} className="mb-5"/>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>Full Name: {userData.fullName}</Text>
        <Text style={styles.detailItem}>Email: {userData.email}</Text>
        <Text style={styles.detailItem}>Blood Group: {userData.bloodGroup}</Text>
        <Text style={styles.detailItem}>Phone Number: {userData.phoneNumber}</Text>
        <Text style={styles.detailItem}>Location: {userData.location}</Text>
      </View>
      <TouchableOpacity className="bg-red-500 w-80 py-4 ml-5 rounded-lg mb-4 " onPress={() => navigation.navigate('EditProfilePage', { userData })}>
        <Text  className="text-center text-lg text-white">Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-500 w-80 py-4 ml-5 rounded-lg mb-4"
                onPress={() => navigation.navigate('LoginScreen')}>
                    <Text className="text-center text-lg text-white">Logout</Text>
                </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
   
  },
 
  detailItem: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 25,
    
  },

});
    
export default ProfilePage;
