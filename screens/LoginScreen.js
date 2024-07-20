import React from "react";
import { View, SafeAreaView, Text, TouchableOpacity, Image,TextInput,StyleSheet,Alert,Pressable, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import TextInputComponent from "../components/textInput";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { sizes } from "../constants";
import { useUserContext } from "../config/userContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";


const LoginScreen = () =>{
    const navigation = useNavigation();
    const[username, setUsername]= useState('');
    const {loading,setLoading, fecthUserData ,currentUser}= useUserContext()
    const { getItem, setItem, removeItem } = useAsyncStorage("email");

    const handleSignIn = async (email,password) => {
      setLoading(true)
      try {
        const response = await signInWithEmailAndPassword(auth,email,password)
        if(response?.user){
          // console.log(response?.user)
          let userData = await fecthUserData(email) 
          if (userData!== null){
            await setItem(response?.user.email);
            navigation.navigate("HomePage",{userData})
          }
          
        }
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
        
    };

    return(
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
           <KeyboardAvoidingView  behavior="padding" className="items-center">
                {/* Header */}
                <Image source={require('../assets/logo.png')} className="mb-5"/>
                <Text className="text-red-500 text-xl font-bold mb-2">Welcome Back😊</Text>
                <Text className="text-gray-700 mb-2">Enter your credentials to log in</Text>

                {/* Login Form */}
                <View className="flex-1">
                  <Formik initialValues={{
                    email:"",
                    password:""
                  }} onSubmit={async (values)=>{
              await handleSignIn(values?.email,values?.password)
                  }}>
       {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          values,
          touched,
          setFieldValue,
        }) => (
        
          <View style={{width:sizes.screenWidth,paddingHorizontal:15}}>
<TextInputComponent
              label={'Email'}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'email'}
              errors={errors}
              touched={touched}
            />
            <TextInputComponent
              label={'Password'}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'password'}
              errors={errors}
              type="password"
              touched={touched}
            />
 
            <Pressable className="bg-red-500 w-90 py-4 mt-4 rounded-lg mb-4" onPress={handleSubmit}>
              <Text  className="text-center text-lg text-white">{loading? "loading": "Login"}</Text>
            </Pressable>
          </View>
     
          )}
    

                  </Formik>
                    {/* Login Button */}
                   
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 5,
      backgroundColor: '#fff',
    },
    form: {
      marginTop: 0,
      alignSelf: 'center',
      width: '100%',
      maxWidth: 400,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#1F2937',
      marginBottom: 4,
    },
    input: {
      height: 40,
      borderColor: '#D1D5DB',
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 8,
      color: '#1F2937',
    },
    passwordHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    forgotPassword: {
      fontSize: 12,
      color: '#6366F1',
      fontWeight: '600',
    },
    button: {
      backgroundColor: '#6366F1',
      paddingVertical: 12,
      borderRadius: 4,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default LoginScreen;