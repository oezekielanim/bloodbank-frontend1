import React from "react";
import { View, SafeAreaView,KeyboardAvoidingView,Platform, Text, TouchableOpacity, Image,StyleSheet,Alert, Pressable, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, UserRef } from "../config/firebase";
import { addDoc } from "firebase/firestore";
import { Formik } from "formik";
import TextInputComponent from "../components/textInput";
import { sizes } from "../constants";


const SignUpPage = ({navigation}) =>{
   // const navigation = useNavigation();

  
    const [loading,setLoading] = useState(false)
const signUp = async (email,password,FullName,phoneNumber)=>{
setLoading(true)
try {
  const user = await createUserWithEmailAndPassword(auth,email,password)
  if(user){
    await addDoc(UserRef,{
      id:Math.ceil(Math.random()*100000),
      email:email,
      FullName:FullName,
      phoneNumber:phoneNumber
    })

  }
  console.log("Success")
  //use toast
  
  
  //navigate to main
} catch (error) {
  console.log(error)
}finally{
setLoading(false)
}
navigation.navigate("LoginScreen")
}
   
    return(
        <SafeAreaView style={{flex:1,width:sizes.screenWidth,flexDirection:"column"}}>
          <KeyboardAvoidingView style={{height:"100%"}}    behavior="padding" keyboardVerticalOffset={Platform.OS === "ios"?20 : 0}>
  
            <ScrollView contentContainerStyle={{flexDirection:"column",justifyContent:"center",alignItems:"center"}} style={{minHeight:"100%"}}>
              
                <Image source={require('../assets/logo.png')} className="mb-5"/>
                <Text className="text-red-500 text-xl font-bold mb-2">Create your account</Text>
                <Text className="text-gray-700 mb-2">Register now to create new account</Text>

                {/* Login Form */}
                <Formik

                
        initialValues={{
          email: '',
          FullName:"",
          password: '',
          phoneNumber:"",
       
        }}
        onSubmit={async (values, { resetForm }) => {
          signUp(values.email,values.password,values.FullName,values.phoneNumber)
        resetForm()
             }}
             //create a validation schema
        >
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

              <TextInputComponent
              label={'Confirm password'}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'confirmpassword'}
              errors={errors}
              type="password"
              touched={touched}
            />

            <TextInputComponent
              label={'Full Name'}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'FullName'}
              errors={errors}
              touched={touched}
            />
            <TextInputComponent
              label={'Phone Number'}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              id={'phoneNumber'}
              errors={errors}
              touched={touched}
            />
           <Pressable className="bg-red-500 w-90 py-4 mt-4 rounded-lg mb-4" onPress={handleSubmit}>
              <Text  className="text-center text-lg text-white">{loading? "loading": "Sign Up"}</Text>
            </Pressable>
          </View>
     
          )}
    

        </Formik>
        </ScrollView>


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

export default SignUpPage;