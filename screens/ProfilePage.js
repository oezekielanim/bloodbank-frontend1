import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Button,handleLogout, Text,TouchableOpacity, Image,TextInput,StyleSheet,Alert,Pressable, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useUserContext } from "../config/userContext";
import { Modal } from "react-native";

const ProfilePage = () => {
    const navigation = useNavigation();
    const { getItem } = useAsyncStorage("email");
    const [email, setEmail] = useState('');
    const {currentUser, fecthUserData, loading, setLoading} = useUserContext();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);


    useEffect(() => {
      const fetchEmail = async () => {
        try{
          const storedEmail = await getItem();
          if (storedEmail !== null){
            setEmail(storedEmail)
          }
        }catch (error) {
          console.log(error);
        }
      };

      fetchEmail();
    }, []);

    useEffect(()=> {
      fecthUserData(email)
    }, [])

    const userData = {
        fullName: '',
        email: '',
        bloodGroup: '',
        phoneNumber: '',
        // location: '',
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
        <Text style={styles.detailItem}>Full Name: {currentUser?.FullName}</Text>
        <Text style={styles.detailItem}>Email: {currentUser?.email}</Text>
        {/* <Text style={styles.detailItem}>Blood Group: {userData.bloodGroup}</Text> */}
        <Text style={styles.detailItem}>Phone Number: {currentUser?.phoneNumber}</Text>
        {/* <Text style={styles.detailItem}>Location: {userData.location}</Text> */}
      </View>
      {/* <TouchableOpacity className="bg-red-500 w-80 py-4 ml-5 rounded-lg mb-4 " onPress={() => navigation.navigate('EditProfilePage', { userData })}>
        <Text  className="text-center text-lg text-white">Edit</Text>
      </TouchableOpacity> */}
      <TouchableOpacity className="bg-gray-500 w-80 py-4 ml-5 rounded-lg mb-4"
                onPress={() => setIsModalVisible(true)}>
                    <Text className="text-center text-lg text-white">Logout</Text>
                </TouchableOpacity>
    </View>
    <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 justify-center items-center bg-white bg-opacity-50  ">
          <View className="w-4/5 bg-white rounded-lg p-5 items-center">
            <Text className="text-lg text-black mb-5">Are you sure you want to log out?</Text>
            <View className="flex-row justify-between w-full">
              <TouchableOpacity
                className="flex-1 bg-red-500 rounded-lg py-3 mx-2 justify-center items-center"
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text className="text-white text-lg">Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-gray-500 rounded-lg py-3 mx-2 justify-center items-center"
                onPress={() => setIsModalVisible(false)}
              >
                <Text className="text-white text-lg">No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
