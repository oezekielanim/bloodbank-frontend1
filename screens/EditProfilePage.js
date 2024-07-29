import React, { useEffect, useState } from 'react';
import { View, Text,SafeAreaView,ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from "formik";
import TextInputComponent from "../components/textInput";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useUserContext } from '../config/userContext';
import { db } from '../config/firebase';
import { doc,updateDoc } from 'firebase/firestore';

const EditProfilePage = () => { 
  const route = useRoute();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(route.params.userData);
  const [email, setEmail] = useState('')
  const {currentUser, fecthUserData, loading, setLoading,updateUser} = useUserContext();
  const { getItem } = useAsyncStorage("email");
  
  const handleSave = async () => {
    try {
      setLoading(true);
      const userDoc = doc(db, 'users', email);
      await updateDoc(userDoc, userData);
      setLoading(false);
      navigation.navigate('ProfilePage');
    } catch (error) {
      console.error('Error updating document: ', error);
      setLoading(false);
    }
  };    

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
    if (email) {
      fecthUserData(email);
    }
  }, [email]);

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser); 
    }
  }, [currentUser]);
  
  const handleChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  

  return (
    <SafeAreaView>
     <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.innerContainer}>
      <Text style={styles.headerText}>Edit Profile Details</Text>

      <View style={styles.form}>

      <View style={{flexDirection:"column",gap:20}}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={userData.fullName || ''}
        onChangeText={(value) => handleChange('fullName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email || ''}
        onChangeText={(value) => handleChange('email', value)}
      />
     
      <TextInput
         style={styles.input}
        placeholder="Phone Number"
        value={userData.phoneNumber || ''}
        onChangeText={(value) => handleChange('phoneNumber', value)}
      />
      </View>
      <TouchableOpacity className="bg-red-500 w-100 py-4 ml-5 mr-5 mt-20 rounded-lg mb-4"
          onPress={() => handleSave()}>
              <Text className="text-center text-lg text-white">Save</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingHorizontal: 10,
    
    paddingHorizontal: 10,    
    
    borderRadius:8,
    height:50,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop:40,
  },
  form: {
    flex: 1,
    width: '100%',
  },
 
  
});

export default EditProfilePage;
